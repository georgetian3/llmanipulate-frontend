"use client"

import { TaskConfigOutput } from "@/api";
import { AuthGuard } from "@/components/auth";
import api from "@/lib/apis";
import { addToast, Button, Card, CardBody, Tab, Tabs } from "@heroui/react";
import { Editor } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useMemo, useState } from "react";



const defaultConfig = `{
  "name": {
    "languages": {
      "en": "Sample Task Name"
    },
    "default": "en"
  },
  "description": {
    "languages": {
      "en": "This is a descritpion for the sample task"
    },
    "default": "en"
  },
  "pages": [
    {
      "columns": 1,
      "label": {
        "languages": {
          "en": "Sample Page title"
        },
        "default": "en"
      },
      "component_groups": [
        {
          "columns": 1,
          "label": {
            "languages": {
              "en": "Component group 1"
            },
            "default": null
          },
          "components": [
            {
              "id": "f1",
              "label": {
                "languages": {
                  "en": "# Free ~text~ *with* **markdown** [links](https://www.google.com)"
                },
                "default": "en"
              },
              "optional": false,
              "type": "free_text",
              "regex": ".*",
              "regex_prompt": null
            }
          ]
        }
      ]
    }
  ],
  "public": true
}
`



function PreviewTab() {
  return (
    <div></div>
  )

}


interface ConfigTabProps {
  taskConfig: string
  setTaskConfig: Dispatch<SetStateAction<string>>
}

function ConfigTab({ taskConfig, setTaskConfig }: ConfigTabProps) {
  const { theme } = useTheme();
  const [warning, setWarning] = useState("")


  function handleChange(value: string | undefined) {
    if (value === undefined) {
      return
    }
    try {
      JSON.parse(value)
      setTaskConfig(value)
      setWarning("")
    } catch {
      setWarning("Invalid JSON")
    }
  }


  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <Editor
        className="p-4"
        theme={theme === "light" ? "light" : "vs-dark"}
        defaultLanguage="json"
        defaultValue={taskConfig}
        onChange={(value) => handleChange(value)}
      />
      {warning && <div className="text-danger">
        {warning}
      </div>}

    </div>
  )
}

function CreateTab() {
  return (
    <div></div>
  )
}


function TaskCreatePage() {
  const [taskConfig, setTaskConfig] = useState(defaultConfig)

  const [creating, setCreating] = useState(false)
  const router = useRouter()


  async function handleCreate() {
    setCreating(true)
    try {
      const resp = await api.createTask({ config: JSON.parse(taskConfig) })
      if (resp.response.status < 300) {
        router.push("/tasks")
      } else {
        addToast({
          title: "Error creating task, please try again",
          description: JSON.stringify(resp.error?.detail),
          color: "danger",
        })
      }
    } catch (e) {
      console.log("Error creating task:", e)
    }
    setCreating(false)
  }

  return (
    <div className="h-[calc(100vh-120px)]">
      <Tabs variant="underlined">
        <Tab title="Config" className="w-full h-full">
          <ConfigTab taskConfig={taskConfig} setTaskConfig={setTaskConfig} />
        </Tab>
        <Tab title="Create">
          <CreateTab />
        </Tab>
        <Tab title="Preview">
          <PreviewTab />
        </Tab>
      </Tabs>
      {/* <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Button
          color="primary"
          className="w-min"
          isDisabled={!validConfig}
          isLoading={creating}
          onPress={handleCreate}
        >
          Create
        </Button>
      </div> */}

    </div>
  )

}

export default function AuthedTaskCreatePage() {
  return (
    <AuthGuard>
      <TaskCreatePage />
    </AuthGuard>
  )
}