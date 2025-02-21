"use client";

import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Pagination } from "@heroui/pagination";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";

import SliderUI from "@/components/slider";
import {
  Chat,
  ComponentGroup,
  ComponentGroupComponentsInner,
  ComponentGroupComponentsInnerTypeEnum,
  createConfiguration,
  FreeText,
  MultiChoice,
  ServerConfiguration,
  SingleChoice,
  Slider,
  TaskConfig,
  TaskPage,
  TasksApi,
} from "@/api";
import { SingleChoiceUI } from "@/components/single-choice";
import { MultiChoiceUI } from "@/components/multi-choice";
import FreeTextUI from "@/components/free-text";
import getTranslation from "@/components/utils";
import Markdown from "@/components/markdown";
import { LeftIcon, RightIcon } from "@/components/icons";
import ChatUI from "@/components/chat";

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
          <Markdown translations={config.label} />
        </CardHeader>
      )}
      <CardBody>{component}</CardBody>
    </Card>
  );
}

function ComponentGroupUI({ config }: { config: ComponentGroup }) {
  const colClass = `grid-cols-${config.columns ?? 1}`

  const body = <div className={`grid ${colClass} gap-4`}>
    {config.components.map((component, index) => (
      <ComponentUI key={index} config={component} />
    ))}
  </div>


  if (config.components.length <= 1) {
    return (
      <div className="flex flex-col gap-4">
        {config.label && <div className="flex v-full justify-center">
          {getTranslation(config.label)}
        </div>}
        {body}
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
      <CardBody>{body}</CardBody>
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

const tasksApi = new TasksApi(
  createConfiguration({
    baseServer: new ServerConfiguration("http://localhost:8000", {}),
  }),
);

const sampleTaskConfig = `
{
  "id": "test config",
  "name": {
    "languages": {
      "en": "test name",
      "zh": "测试名字"
    },
    "_default": "en"
  },
  "description": {
    "languages": {
      "en": "test",
      "zh": "测试描述"
    },
    "_default": "zh"
  },
  "pages": [
    {
      "columns": 1,
      "label": {
        "languages": {
          "en": "Page title"
        },
        "_default": null
      },
      "componentGroups": [
        {
          "columns": 2,
          "label": {
            "languages": {
              "en": "Component group 1"
            },
            "_default": null
          },
          "components": [
            {
              "id": "s1",
              "label": {
                "languages": {
                  "en": "Slider",
                  "zh": "滑动"
                },
                "_default": "en"
              },
              "optional": false,
              "type": "slider",
              "steps": 3,
              "labels": [
                {
                  "languages": {
                    "en": "1"
                  },
                  "_default": null
                },
                {
                  "languages": {
                    "en": "2"
                  },
                  "_default": null
                },
                {
                  "languages": {
                    "en": "3"
                  },
                  "_default": null
                }
              ]
            },
            {
              "id": "sc1",
              "label": {
                "languages": {
                  "en": "Single Choice",
                  "zh": "滑动"
                },
                "_default": "en"
              },
              "optional": false,
              "choices": [
                {
                  "languages": {
                    "en": "1"
                  },
                  "_default": null
                },
                {
                  "languages": {
                    "en": "2"
                  },
                  "_default": null
                },
                {
                  "languages": {
                    "en": "3"
                  },
                  "_default": null
                }
              ],
              "shuffle": true,
              "type": "single_choice"
            },
            {
              "id": "mc1",
              "label": {
                "languages": {
                  "en": "Multi Choice",
                  "zh": "滑动"
                },
                "_default": "en"
              },
              "optional": false,
              "choices": [
                {
                  "languages": {
                    "en": "1"
                  },
                  "_default": null
                },
                {
                  "languages": {
                    "en": "2"
                  },
                  "_default": null
                },
                {
                  "languages": {
                    "en": "3"
                  },
                  "_default": null
                },
                {
                  "languages": {
                    "en": "4"
                  },
                  "_default": null
                }
              ],
              "shuffle": true,
              "type": "multi_choice",
              "minChoices": 0,
              "maxChoices": 4
            },
            {
              "id": "f1",
              "label": {
                "languages": {
                  "en": "# Free ~text~ *with* **markdown** [links](https://www.google.com)",
                  "zh": "滑动"
                },
                "_default": "en"
              },
              "optional": false,
              "type": "free_text",
              "regex": ".*f.*"
            }
          ]
        },
        {
          "columns": 2,
          "label": {
            "languages": {
              "en": "Component group 2"
            },
            "_default": null
          },
          "components": [
            {
              "id": "s12",
              "label": {
                "languages": {
                  "en": "Slider",
                  "zh": "滑动"
                },
                "_default": "en"
              },
              "optional": false,
              "type": "slider",
              "steps": 3,
              "labels": [
                {
                  "languages": {
                    "en": "1"
                  },
                  "_default": null
                },
                {
                  "languages": {
                    "en": "2"
                  },
                  "_default": null
                },
                {
                  "languages": {
                    "en": "3"
                  },
                  "_default": null
                }
              ]
            },
            {
              "id": "sc12",
              "label": {
                "languages": {
                  "en": "Single Choice",
                  "zh": "滑动"
                },
                "_default": "en"
              },
              "optional": false,
              "choices": [
                {
                  "languages": {
                    "en": "1"
                  },
                  "_default": null
                },
                {
                  "languages": {
                    "en": "2"
                  },
                  "_default": null
                },
                {
                  "languages": {
                    "en": "3"
                  },
                  "_default": null
                }
              ],
              "shuffle": true,
              "type": "single_choice"
            },
            {
              "id": "mc12",
              "label": {
                "languages": {
                  "en": "Multi Choice",
                  "zh": "滑动"
                },
                "_default": "en"
              },
              "optional": false,
              "choices": [
                {
                  "languages": {
                    "en": "1"
                  },
                  "_default": null
                },
                {
                  "languages": {
                    "en": "2"
                  },
                  "_default": null
                },
                {
                  "languages": {
                    "en": "3"
                  },
                  "_default": null
                },
                {
                  "languages": {
                    "en": "4"
                  },
                  "_default": null
                }
              ],
              "shuffle": true,
              "type": "multi_choice",
              "minChoices": 0,
              "maxChoices": 4
            },
            {
              "id": "f12",
              "label": {
                "languages": {
                  "en": "# Free ~text~ *with* **markdown** [links](https://www.google.com)",
                  "zh": "滑动"
                },
                "_default": "en"
              },
              "optional": false,
              "type": "free_text",
              "regex": ".*f.*"
            }
          ]
        },
        {
          "columns": 1,
          "label": {
            "languages": {
              "en": "Component group 3"
            },
            "_default": null
          },
          "components": [
            {
              "id": "s13",
              "label": {
                "languages": {
                  "en": "Slider",
                  "zh": "滑动"
                },
                "_default": "en"
              },
              "optional": false,
              "type": "slider",
              "steps": 3,
              "labels": [
                {
                  "languages": {
                    "en": "1"
                  },
                  "_default": null
                },
                {
                  "languages": {
                    "en": "2"
                  },
                  "_default": null
                },
                {
                  "languages": {
                    "en": "3"
                  },
                  "_default": null
                }
              ]
            },
            {
              "id": "sc13",
              "label": {
                "languages": {
                  "en": "Single Choice",
                  "zh": "滑动"
                },
                "_default": "en"
              },
              "optional": false,
              "choices": [
                {
                  "languages": {
                    "en": "1"
                  },
                  "_default": null
                },
                {
                  "languages": {
                    "en": "2"
                  },
                  "_default": null
                },
                {
                  "languages": {
                    "en": "3"
                  },
                  "_default": null
                }
              ],
              "shuffle": true,
              "type": "single_choice"
            },
            {
              "id": "mc13",
              "label": {
                "languages": {
                  "en": "Multi Choice",
                  "zh": "滑动"
                },
                "_default": "en"
              },
              "optional": false,
              "choices": [
                {
                  "languages": {
                    "en": "1"
                  },
                  "_default": null
                },
                {
                  "languages": {
                    "en": "2"
                  },
                  "_default": null
                },
                {
                  "languages": {
                    "en": "3"
                  },
                  "_default": null
                },
                {
                  "languages": {
                    "en": "4"
                  },
                  "_default": null
                }
              ],
              "shuffle": true,
              "type": "multi_choice",
              "minChoices": 0,
              "maxChoices": 4
            },
            {
              "id": "f13",
              "label": {
                "languages": {
                  "en": "# Free ~text~ *with* **markdown** [links](https://www.google.com)",
                  "zh": "滑动"
                },
                "_default": "en"
              },
              "optional": false,
              "type": "free_text",
              "regex": ".*f.*"
            }
          ]
        }
      ]
    },
    {
      "columns": 2,
      "label": {
        "languages": {
          "en": "Page title"
        },
        "_default": null
      },
      "componentGroups": [
        {
          "columns": 1,
          "label": null,
          "components": [
            {
              "id": "chat",
              "label": null,
              "optional": false,
              "type": "chat"
            }
          ]
        },
        {
          "columns": 2,
          "label": {
            "languages": {
              "en": "Component group label"
            },
            "_default": null
          },
          "components": [
            {
              "id": "s2",
              "label": {
                "languages": {
                  "en": "Slider",
                  "zh": "滑动"
                },
                "_default": "en"
              },
              "optional": false,
              "type": "slider",
              "steps": 3,
              "labels": [
                {
                  "languages": {
                    "en": "1"
                  },
                  "_default": null
                },
                {
                  "languages": {
                    "en": "2"
                  },
                  "_default": null
                },
                {
                  "languages": {
                    "en": "3"
                  },
                  "_default": null
                }
              ]
            },
            {
              "id": "sc2",
              "label": {
                "languages": {
                  "en": "Single Choice",
                  "zh": "滑动"
                },
                "_default": "en"
              },
              "optional": false,
              "choices": [
                {
                  "languages": {
                    "en": "1"
                  },
                  "_default": null
                },
                {
                  "languages": {
                    "en": "2"
                  },
                  "_default": null
                },
                {
                  "languages": {
                    "en": "3"
                  },
                  "_default": null
                }
              ],
              "shuffle": true,
              "type": "single_choice"
            },
            {
              "id": "mc2",
              "label": {
                "languages": {
                  "en": "Multi Choice",
                  "zh": "滑动"
                },
                "_default": "en"
              },
              "optional": false,
              "choices": [
                {
                  "languages": {
                    "en": "1"
                  },
                  "_default": null
                },
                {
                  "languages": {
                    "en": "2"
                  },
                  "_default": null
                },
                {
                  "languages": {
                    "en": "3"
                  },
                  "_default": null
                }
              ],
              "shuffle": true,
              "type": "multi_choice",
              "minChoices": 0,
              "maxChoices": 3
            },
            {
              "id": "f2",
              "label": {
                "languages": {
                  "en": "Free text *with* **markdown** [test](h)",
                  "zh": "滑动"
                },
                "_default": "en"
              },
              "optional": false,
              "type": "free_text",
              "regex": ".*f.*"
            }
          ]
        }
      ]
    }
  ]
}
`;

export default function TaskUI() {
  const [currentPage, setCurrentPage] = useState(0);
  const [taskConfig, setTaskConfig] = useState<TaskConfig | null>(
    JSON.parse(sampleTaskConfig) as TaskConfig,
  );
  const [editableTaskConfig, setEditableTaskConfig] =
    useState(sampleTaskConfig);
  const [warningText, setWarningText] = useState("");

  function parseEditedConfig(newConfig: string) {
    setEditableTaskConfig(newConfig);
    try {
      console.log("parsing config");
      const parsedConfig = JSON.parse(newConfig) as TaskConfig;

      console.log("ParsedConfig", parsedConfig);
      setTaskConfig(parsedConfig);
      setWarningText("");
    } catch (e) {
      setWarningText("Invalid config");
    }
  }

  useEffect(() => {
    tasksApi.getTask("test")
      .then((taskConfig) => {
        setTaskConfig(taskConfig)
        setEditableTaskConfig(JSON.stringify(taskConfig, null, 2))
      })
      .catch((reason) => console.log("Error getting task config", reason))
  }, [])

  if (!taskConfig) {
    return <>Loading</>;
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
