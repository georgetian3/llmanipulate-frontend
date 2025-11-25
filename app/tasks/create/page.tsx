"use client"

import { TaskConfigOutput, Translations } from "@/api";
import { AuthGuard } from "@/components/auth";
import api from "@/lib/apis";
import { addToast, Autocomplete, AutocompleteItem, AutocompleteSection, Button, Card, CardBody, Code, Input, Pagination, Tab, Tabs, Textarea } from "@heroui/react";
import { Editor } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from "react";
import ISO6391, { LanguageCode } from 'iso-639-1';
import Test from "@/components/test";
import { Languages } from "next/dist/lib/metadata/types/alternative-urls-types";


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


interface TranslationInputProps {
  existingLanguages: Set<string>
  language: string
  setLanguage: (language: string) => void
  translation: string
  setTranslation: (translation: string) => void
}

function TranslationInput({ existingLanguages, language, setLanguage, translation, setTranslation }: TranslationInputProps) {


  return (
    
  )
}

interface TranslationsInputProps {
  onChange: (translations: Translations) => void
}


function TranslationsInput({ onChange }: TranslationsInputProps) {
  const [translations, setTranslations] = useState(new Map<string, string>())
  const languages = useMemo(() => ISO6391.getLanguages(ISO6391.getAllCodes()), [])
  const usedLanguages = useMemo(() => new Set(translations.keys()), [translations])
  const unusedLanguages = useMemo(() => new Set(ISO6391.getAllCodes()).difference(usedLanguages), [translations])
  const [defaultLanguage, setDefaultLanguage] = useState("")
  const languageFilter = useCallback((textValue: string, inputValue: string) => textValue.includes(inputValue.toLocaleLowerCase()), [])

  const handleTranslationChange = useCallback((language: LanguageCode, translation: string) => {
    translations.set(language, translation)
  }, [translations])

  const items = useMemo(() => {
    const list = []
    for (let [language, translation] of translations) {
      list.push(
        <div className="flex gap-2 items-center">
          <div className="flex-none">
            <Autocomplete
              placeholder="Language"
              selectedKey={language}
              onSelectionChange={(key) => setLanguage(key as string)}
              defaultItems={languages}
              defaultFilter={languageFilter}
            >
              {(language) =>
                <AutocompleteItem key={language.code} textValue={`${language.code} - ${language.nativeName} - ${language.name}`.toLocaleLowerCase()}>
                  <Code>{language.code}</Code>
                  {`- ${language.nativeName} - ${language.name}`}
                </AutocompleteItem>
              }
            </Autocomplete>
          </div>
          <div className="grow">
            <Textarea
              value={translation}
              onValueChange={setTranslation}
              minRows={1}
            />
          </div>
        </div >
      )
    }
    return list
  }, [translations])

  return (
    <div>
      {items}
    </div>
  )
}

function CreateTab() {
  const [translations, setTranslations] = useState<Translations>()
  return (
    <div className="flex flex-col gap-4">
      <TranslationsInput onChange={(translations) => setTranslations(translations)} />
      <Test />
      <Pagination showControls initialPage={1} total={10} />
    </div>
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