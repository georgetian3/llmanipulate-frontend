import { Textarea } from "@heroui/input";

import { FreeText } from "@/api";
import { useState } from "react";

interface FreeTextProps {
  config: FreeText;
}

export default function FreeTextUI({ config }: FreeTextProps) {
  const [textInput, setTextInput] = useState("")
  const [match, setMatch] = useState(true)
  function handleTextInput(text: string) {
    setTextInput(text)
    if (config.regex) {
      const regex = new RegExp(config.regex)
      setMatch(regex.test(text))
    }
  }
  return <div>
    <Textarea onChange={(event) => handleTextInput(event.target.value)} />;
    {!match && <p>{config.regexPrompt ?? "Invalid input"}</p>}
  </div>
}
