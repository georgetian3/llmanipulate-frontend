import { Checkbox, CheckboxGroup } from "@heroui/checkbox";


import { getTranslation } from "./utils";
import { useAppDispatch } from "@/lib/hooks";
import { setComponentResponse } from "@/lib/appSlice";
import { MultiChoice } from "@/api";

interface MultiChoiceProps {
  config: MultiChoice;
}

export function MultiChoiceUI({ config }: MultiChoiceProps) {

  const dispatch = useAppDispatch()

  function handleInput(value: string[]) {
    dispatch(setComponentResponse({ componentId: config.id, response: value.map(x => Number.parseInt(x)) }))
  }

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
