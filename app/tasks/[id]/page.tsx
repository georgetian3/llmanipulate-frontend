"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/react";

import SliderUI from "@/components/slider";

import { SingleChoiceUI } from "@/components/single-choice";
import { MultiChoiceUI } from "@/components/multi-choice";
import FreeTextUI from "@/components/free-text";
import Markdown from "@/components/markdown";
import ChatUI from "@/components/chat";
import { getTranslation } from "@/components/utils";
import { AuthGuard } from "@/components/auth";
import { ChatConfig, ComponentGroupOutput, FreeText, MultiChoice, SingleChoice, Slider, TaskPageOutput } from "@/api";
import api from "@/lib/apis";
import { ComponentIdType, resetCurrentTask, selectCurrentTask, selectCurrentUser, selectState, setCurrentTask } from "@/lib/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { forbidden, useRouter } from "next/navigation";
import { addToast } from "@heroui/toast";
import AdminTaskPage from "./admin";
import { useAppSelector } from "@/lib/hooks";
import { CenteredSpinner } from "@/components/common";
import { Card, CardBody, CardHeader } from "@heroui/react";

interface ComponentProps {
  config: SingleChoice | MultiChoice | Slider | FreeText | ChatConfig;
}

function ComponentUI({ config }: ComponentProps) {
  let component;
  if (config.type == "single_choice") {
    component = <SingleChoiceUI config={config as SingleChoice} />;
  } else if (config.type == "multi_choice") {
    component = <MultiChoiceUI config={config as MultiChoice} />;
  } else if (config.type == "slider") {
    component = <SliderUI config={config as Slider} />;
  } else if (config.type == "free_text") {
    component = <FreeTextUI config={config as FreeText} />;
  } else if (config.type == "chat") {
    return <ChatUI config={config as ChatConfig} />;
  }

  return (
    <Card>
      <CardHeader className="flex gap-1">
        {config.label && <Markdown content={config.label} />}
        {!config.optional && <div className="text-danger">*</div>}
      </CardHeader>
      <CardBody>{component}</CardBody>
    </Card>
  );
}

function ComponentGroupUI({ config }: { config: ComponentGroupOutput }) {
  const colClass = `grid-cols-${config.columns ?? 1}`

  if (config.components.length <= 1) {
    return (
      <div className="flex flex-col gap-4">
        {config.label && <div className="flex v-full justify-center">
          {getTranslation(config.label)}
        </div>}
        {<ComponentUI config={config.components[0]} />}
      </div>
    )
  }
  return (
    <Card>
      {config.label && (
        <CardHeader className="flex justify-center">
          {getTranslation(config.label)}
        </CardHeader>
      )}
      <CardBody>
        <div className={`grid ${colClass} gap-4`}>
          {config.components.map((component, index) => (
            <ComponentUI key={index} config={component} />
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

function TaskPageUI({ config, hidden }: { config: TaskPageOutput; hidden: boolean }) {
  const colClass = `grid-cols-${config.columns ?? 1}`
  return (
    !hidden && (
      <div className="w-full h-full overflow-scroll">
        <div className="flex justify-center text-4xl">
          {getTranslation(config.label)}
        </div>
        <div className={`grid ${colClass} p-8 gap-4`}>
          {config.component_groups.map((componentGroup, index) => (
            <ComponentGroupUI key={index} config={componentGroup} />
          ))}
        </div>
      </div>
    )
  );
}


interface TaskUIProps {
  taskId: string
}

function TaskUI({ taskId }: TaskUIProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [nextLoading, setNextLoading] = useState(false)
  const [taskLoading, setTaskLoading] = useState(false)
  const state = useSelector(selectState)
  const task = useSelector(selectCurrentTask)
  const pageCount = task?.config.pages.length
  const router = useRouter()
  const dispatch = useDispatch()


  useEffect(() => {
    (async () => {
      setTaskLoading(true)
      try {
        const { data, response } = await api.getTask(taskId)
        if (response.status == 403) {
          forbidden()
        }
        dispatch(setCurrentTask(data))
      } catch (e) {
        console.log("Error getting task config", e)
      }
      setTaskLoading(false)
    })()
  }, [dispatch, taskId])


  async function handleNext() {
    if (!pageCount) {
      return
    }
    setNextLoading(true)
    const currentResponses = state.currentTaskResponse
    const onLastPage = currentPage === pageCount - 1

    // checking component responses
    const missingComponentIds: ComponentIdType[] = []
    task.config.pages.map((page, index) => {
      // all components in current and previous pages should have responses
      if (index <= currentPage) {
        page.component_groups.map(group => group.components.map(component => {
          if (!component.optional && !state.currentTaskResponse.hasOwnProperty(component.id)) {
            missingComponentIds.push(component.id)
          }
        }))
      }
    })
    if (missingComponentIds.length) {
      console.log("Components missing responses:", missingComponentIds)
      addToast({
        title: "Please complete all required fields",
        color: "warning",
      })
      setNextLoading(false)
      return
    }


    if (onLastPage) {
      const resp = await api.submitResponse(task.id, currentResponses)
      if (resp) {
        dispatch(resetCurrentTask())
        router.push("/tasks")
      } else {
        addToast({
          title: "Error submitting response, please try again",
          color: "danger",
        })
        setNextLoading(false)
      }
    } else {
      setCurrentPage(currentPage + 1)
      setNextLoading(false)
    }
  }


  if (taskLoading) {
    return <CenteredSpinner />
  }

  if (!task) {
    return <div className="h-full w-full flex justify-center items-center">
      Error loading task, please refresh.
    </div>
  }

  return (
    <>
      <div className="h-full w-full flex flex-col items-center gap-4 py-8">
        {task.config.pages.map((page, index) => (
          <TaskPageUI key={index} config={page} hidden={currentPage != index} />
        ))}
        <div className="flex gap-4 items-center">
          Page {currentPage + 1} of {pageCount}
          <Button isLoading={nextLoading} color="primary" onPress={handleNext}>
            Next
          </Button>
        </div>
      </div>
    </>
  )
}


interface TaskParams {
  params: Promise<{ id: string }>
}

export default function AuthedTaskPage({ params }: TaskParams) {
  const [taskId, setTaskId] = useState("")
  const currentUser = useAppSelector(selectCurrentUser)

  useEffect(() => {
    (async () => {
      setTaskId((await params).id)
    })()
  }, [params])

  if (!taskId) {
    return <CenteredSpinner />
  }

  if (currentUser && currentUser.admin) {
    return <AuthGuard admin>
      <AdminTaskPage taskId={taskId} />
    </AuthGuard>
  }
  return <TaskUI taskId={taskId} />
}

