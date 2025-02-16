// 'use client'

// import { ComponentGroup, ComponentGroupComponentsInner, ComponentGroupComponentsInnerTypeEnum, createConfiguration, DefaultApi, ServerConfiguration, SingleChoice, Slider, TaskConfig, TaskPage, TasksApi, Translations } from "@/api"
// import { useEffect, useState } from "react"
// import SliderUI from "../components/Slider"


// interface FreeTextProps {
//   label: string
// }

// function FreeText({ label }: FreeTextProps) {
//   return <div className="border-red-500 border-4">
//     <p>{label}</p>
//     <input type="text" placeholder="type here">

//     </input>
//   </div>
// }

// function getTranslation(translations?: Translations | null, language?: string): string {
//   if (!translations) {
//     return ""
//   }
//   if (Object.keys(translations.languages).length == 0) {
//     console.error("Empty translation", translations)
//     return ""
//   }
//   const languages = translations.languages as Record<string, string> ?? {}

//   if (language && language in languages) {
//     return languages[language]
//   }
//   if (translations._default) {
//     return languages[translations._default]
//   }
//   return Object.values(languages)[0]
// }

// interface ComponentProps {
//   config: ComponentGroupComponentsInner
// }

// function ComponentUI({ config }: ComponentProps) {
//   let component = null
//   if (config.type == ComponentGroupComponentsInnerTypeEnum.SingleChoice) {
//     component = <></>
//   } else if (config.type == ComponentGroupComponentsInnerTypeEnum.MultiChoice) {
//     component = <></>
//   } else if (config.type == ComponentGroupComponentsInnerTypeEnum.Slider) {
//     component = <SliderUI config={config as Slider} />
//   }
//   return <div>
//     <h1>{getTranslation(config.label)}</h1>
//     { component }
//   </div>
// }

// function ComponentGroupUI({ componentGroup }: { componentGroup: ComponentGroup }) {
//   return <div>
//     <h1>{getTranslation(componentGroup.label)}</h1>
//     {componentGroup.components.map((component, index) => <ComponentUI key={index} config={component} />)}
//   </div>
// }

// function TaskPageUI({ taskPage, hidden }: { taskPage: TaskPage, hidden: boolean }) {
//   return !hidden && <div className="border-green-500 border-4">
//     <h1>{getTranslation(taskPage.label)}</h1>
//     {taskPage.componentGroups.map((componentGroup, index) => <ComponentGroupUI key={index} componentGroup={componentGroup} />)}
//   </div>
// }

// const tasksApi = new TasksApi(createConfiguration({ baseServer: new ServerConfiguration("http://localhost:8000", {}) }));

// export default function TestPage() {
//   const [currentPageIndex, setCurrentPageIndex] = useState(0)
//   const [taskConfig, setTaskConfig] = useState<TaskConfig | null>(null)

//   useEffect(() => {
//     tasksApi.getTask("test").then((taskConfig) => setTaskConfig(taskConfig))
//   }, [])

//   return <div>
//     <Button>Click me</Button>
//   </div>

//   return <div>
//     <div className="flex space-x-4">
//       {
//         taskConfig && [...Array(taskConfig.pages.length)].map((_, i) => {
//           return <button
//             key={i}
//             className={currentPageIndex == i ? "text-black" : "text-gray-500"}
//             onClick={() => setCurrentPageIndex(i)}
//           >
//             {i + 1}
//           </button>
//         })
//       }
//     </div>
//     {taskConfig && taskConfig.pages.map((page, index) => <TaskPageUI key={index} taskPage={page} hidden={currentPageIndex != index} />)}
//   </div>
// }

export default function TestPage() {
  return <></>
}