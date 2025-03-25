"use client"

import { AuthGuard } from "@/components/auth";
import api from "@/lib/apis";
import { Button, Card, CardBody } from "@heroui/react";
import { Editor } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useState } from "react";



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

function TaskCreatePage() {
  const { theme } = useTheme();
  const [warning, setWarning] = useState("")
  const [config, setConfig] = useState(defaultConfig)
  const [creating, setCreating] = useState(false)
  const router = useRouter()


  function handleChange(value: string | undefined) {
    if (value === undefined) {
      return
    }
    try {
      JSON.parse(value)
      setConfig(value)
      setWarning("")
    } catch {
      setWarning("Invalid JSON")
    }
  }

  async function handleCreate() {
    setCreating(true)
    try {
      const resp = await api.createTask({config: JSON.parse(config)})
      if (resp.response.status < 300) {
        router.push("/tasks")
      } else {
        setWarning(JSON.stringify(resp.error?.detail) ?? "Unknown error")
      }
    } catch (e) {
      console.log("Error creating task:", e)
    }
    setCreating(false)
  }

  return (
    <div className="flex flex-col w-full h-full justify-center items-center p-4 gap-4">
      <Card className="w-full h-full">
        <CardBody>
          <Editor
            theme={theme === "light" ? "light" : "vs-dark"}
            defaultLanguage="json"
            defaultValue={defaultConfig}
            onChange={(value) => handleChange(value)}
          />
        </CardBody>
      </Card>
      {warning && <div className="text-danger">
        {warning}
      </div>}
      <Button
        color="primary"
        className="w-min"
        isDisabled={!!warning}
        isLoading={creating}
        onPress={handleCreate}
      >
        Create
      </Button>
    </div>
  )
}

export default function AuthedTaskCreatePage() {
  return (
    <AuthGuard admin>
      <TaskCreatePage />
    </AuthGuard>
  )
}