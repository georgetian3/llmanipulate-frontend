"use client";

import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Pagination } from "@heroui/pagination";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";

import SliderUI from "@/components/slider";

import { SingleChoiceUI } from "@/components/single-choice";
import { MultiChoiceUI } from "@/components/multi-choice";
import FreeTextUI from "@/components/free-text";
import Markdown from "@/components/markdown";
import { LeftIcon, RightIcon } from "@/components/icons";
import ChatUI from "@/components/chat";
import { getTranslation } from "@/components/utils";
import { AuthGuard } from "@/components/auth";
import { Chat, ComponentGroup, FreeText, MultiChoice, SingleChoice, Slider, TaskConfig, TaskPage } from "@/api";
import api from "@/lib/apis";
import { ComponentIdType, selectState, setCurrentTask } from "@/lib/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Spinner } from "@heroui/react";

interface ComponentProps {
  config: SingleChoice | MultiChoice | Slider | FreeText | Chat;
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
    return <ChatUI config={config as Chat} />;
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

function ComponentGroupUI({ config }: { config: ComponentGroup }) {
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

function TaskPageUI({ config, hidden }: { config: TaskPage; hidden: boolean }) {
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


interface TaskParams {
  params: Promise<{ id: string }>
}


export function TaskUI({ params }: TaskParams) {
  const [currentPage, setCurrentPage] = useState(0);
  const [editableTaskConfig, setEditableTaskConfig] = useState("");
  const [warningText, setWarningText] = useState("");
  const state = useSelector(selectState)
  const task = useSelector(selectState).currentTask
  const pageCount = task?.config.pages.length
  const router = useRouter()
  const dispatch = useDispatch()

  function parseEditedConfig(newConfig: string) {
    setEditableTaskConfig(newConfig);
    try {
      const parsedConfig = JSON.parse(newConfig) as TaskConfig;
      setWarningText("");
    } catch {
      setWarningText("Invalid config");
    }
  }

  async function handleNext() {
    if (!pageCount) {
      return
    }
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

    if (missingComponentIds) {
      console.log("Components missing responses:", missingComponentIds)
      return
    }


    await api.submitResponse(task.id, currentResponses, !onLastPage)
    if (onLastPage) {
      router.push("/tasks")
    } else {
      setCurrentPage(currentPage + 1)
    }
  }

  useEffect(() => {
    (async () => {
      const taskId = (await params).id
      try {
        const task = await api.getTask(taskId)
        if (!task) {
          console.log("Error getting task in try")
          return
        }
        dispatch(setCurrentTask(task))
        setEditableTaskConfig(JSON.stringify(task?.config, null, 2))
      } catch (e) {
        console.log("Error getting task config", e)
      }
    })()
  }, [])

  if (!task) {
    return <div className="h-full w-full flex justify-center">
      <Spinner size="lg" />
    </div>
  }

  return (
    <div className="h-full w-full flex flex-col items-center gap-4 py-8">
      <div className="absolute top-20 left-2">
        <Card>
          <CardHeader>Change the config here</CardHeader>
          <CardBody>
            <Textarea
              disableAnimation
              disableAutosize
              classNames={{
                input: "resize h-[800px]",
              }}
              value={editableTaskConfig}
              onChange={(event) => parseEditedConfig(event.target.value)}
            />
          </CardBody>
          <CardFooter className="text-red-500">{warningText}</CardFooter>
        </Card>
      </div>
      {task.config.pages.map((page, index) => (
        <TaskPageUI key={index} config={page} hidden={currentPage != index} />
      ))}
      <div className="flex gap-4 items-center">
        Page {currentPage + 1} of {pageCount}
        <Button color="primary" onPress={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
}


export default function AuthedTaskPage({ params }: TaskParams) {
  return <AuthGuard>
    <TaskUI params={params} />
  </AuthGuard>
}
