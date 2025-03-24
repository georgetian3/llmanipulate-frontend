import { Radio, RadioGroup } from "@heroui/react";


import { getTranslation } from "./utils";
import { SingleChoice } from "@/api";
import { setComponentResponse } from "@/lib/appSlice";
import { useAppDispatch } from "@/lib/hooks";

interface SingleChoiceProps {
  config: SingleChoice;
}

export function SingleChoiceUI({ config }: SingleChoiceProps) {
  const dispatch = useAppDispatch()

  function handleInput(value: string) {
    dispatch(setComponentResponse({componentId: config.id, response: Number.parseInt(value)}))
  }

  return (
    <RadioGroup onValueChange={handleInput}>
      {config.choices.map((choice, index) => (
        <Radio key={index} color="primary" value={index.toString()}>
          {getTranslation(choice)}
        </Radio>
      ))}
    </RadioGroup>
  );
}
