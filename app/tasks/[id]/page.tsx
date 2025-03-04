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
import { Chat, ComponentGroup, ComponentGroupComponentsInner, ComponentGroupComponentsInnerTypeEnum, FreeText, MultiChoice, SingleChoice, Slider, TaskConfig, TaskPage } from "@/api";
import { tasksApi } from "@/components/apis";
import { AuthGuard } from "@/components/auth";
import { useRouter } from "next/router";

interface ComponentProps {
  config: ComponentGroupComponentsInner;
}

function ComponentUI({ config }: ComponentProps) {
  let component = null;

  if (config.type == ComponentGroupComponentsInnerTypeEnum.SingleChoice) {
    component = <SingleChoiceUI config={config as SingleChoice} />;
  } else if (config.type == ComponentGroupComponentsInnerTypeEnum.MultiChoice) {
    component = <MultiChoiceUI config={config as MultiChoice} />;
  } else if (config.type == ComponentGroupComponentsInnerTypeEnum.Slider) {
    component = <SliderUI config={config as Slider} />;
  } else if (config.type == ComponentGroupComponentsInnerTypeEnum.FreeText) {
    component = <FreeTextUI config={config as FreeText} />;
  } else if (config.type == ComponentGroupComponentsInnerTypeEnum.Chat) {
    return <ChatUI config={config as Chat} />;
  }

  return (
    <Card>
      {config.label && (
        <CardHeader>
          <Markdown content={config.label} />
        </CardHeader>
      )}
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
          {config.componentGroups.map((componentGroup, index) => (
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
  const [taskConfig, setTaskConfig] = useState<TaskConfig | null>(null);
  const [editableTaskConfig, setEditableTaskConfig] = useState("");
  const [warningText, setWarningText] = useState("");

  function parseEditedConfig(newConfig: string) {
    setEditableTaskConfig(newConfig);
    try {
      const parsedConfig = JSON.parse(newConfig) as TaskConfig;
      setTaskConfig(parsedConfig);
      setWarningText("");
    } catch {
      setWarningText("Invalid config");
    }
  }

  useEffect(() => {
    (async () => {
      setTaskConfig(null)
      const { id } = await params
      try {
        const task = await tasksApi.getTask(id)
        setTaskConfig(task.config)
        setEditableTaskConfig(JSON.stringify(task.config, null, 2))
      } catch (e) {
        console.log("Error getting task config", e)
      }
    })()
  }, [])

  if (taskConfig === null) {
    return <>Loading</>
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
      {taskConfig.pages.map((page, index) => (
        <TaskPageUI key={index} config={page} hidden={currentPage != index} />
      ))}
      <div className="flex gap-4 items-center">
        <Button
          isIconOnly
          color="primary"
          disabled={currentPage == 0}
          size="sm"
          variant="flat"
          onPress={() => setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev))}
        >
          <LeftIcon />
        </Button>
        <Pagination
          color="primary"
          page={currentPage + 1}
          total={taskConfig.pages.length}
          onChange={(page) => setCurrentPage(page - 1)}
        />
        <Button
          isIconOnly
          color="primary"
          disabled={currentPage == taskConfig.pages.length - 1}
          size="sm"
          variant="flat"
          onPress={() =>
            setCurrentPage((prev) =>
              prev < taskConfig.pages.length - 1 ? prev + 1 : prev,
            )
          }
        >
          <RightIcon />
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
