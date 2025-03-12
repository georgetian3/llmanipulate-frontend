import { Textarea } from "@heroui/input";

import { FreeText } from "@/api";
import { useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { removeComponentResponse, setComponentResponse } from "@/lib/appSlice";

interface FreeTextProps {
  config: FreeText;
}

export default function FreeTextUI({ config }: FreeTextProps) {
  const [validInput, setValidInput] = useState(true)
  const dispatch = useAppDispatch()

  function handleTextInput(text: string) {
    let validInput = true
    if (config.regex) {
      const regex = new RegExp(config.regex)
      validInput = regex.test(text)
    }
    dispatch(validInput
      ? setComponentResponse({ componentId: config.id, response: text })
      : removeComponentResponse(config.id)
    )
    setValidInput(validInput)
  }

  return <div>
    <Textarea onChange={(event) => handleTextInput(event.target.value)} />
    {!validInput && <p className="text-danger">{config.regex_prompt ?? "Invalid input"}</p>}
  </div>
}
