import { Checkbox, CheckboxGroup } from "@heroui/react";


import { getTranslation } from "./utils";
import { useAppDispatch } from "@/lib/hooks";
import { setComponentResponse } from "@/lib/appSlice";
import { MultiChoice } from "@/api";
import { useCallback, useEffect } from "react";

interface MultiChoiceProps {
  config: MultiChoice;
}

export function MultiChoiceUI({ config }: MultiChoiceProps) {

  const dispatch = useAppDispatch()

  const handleInput = useCallback((value: string[]) => {
    dispatch(setComponentResponse({ componentId: config.id, response: value.map(x => Number.parseInt(x)) }))
  }, [config.id, dispatch])

  useEffect(() => {
    if (config.min_choices === 0) {
      handleInput([])
    }
  }, [config.min_choices, handleInput])

  return (
    <CheckboxGroup onValueChange={handleInput}>
      {config.choices.map((choice, index) => (
        <Checkbox key={index} value={index.toString()}>
          {getTranslation(choice)}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
