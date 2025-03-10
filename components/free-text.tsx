import { Textarea } from "@heroui/input";

import { FreeText } from "@/api";
import { useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { setComponentResponse } from "@/lib/appSlice";

interface FreeTextProps {
  config: FreeText;
}

export default function FreeTextUI({ config }: FreeTextProps) {
  const [match, setMatch] = useState(true)
  const dispatch = useAppDispatch()

  function handleTextInput(text: string) {
    if (config.regex) {
      const regex = new RegExp(config.regex)
      setMatch(regex.test(text))
    }
    dispatch(setComponentResponse({ componentId: config.id, response: text }))
  }

  return <div>
    <Textarea onChange={(event) => handleTextInput(event.target.value)} />
    {!match && <p>{config.regex_prompt ?? "Invalid input"}</p>}
  </div>
}
