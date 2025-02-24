import { Radio, RadioGroup } from "@heroui/radio";


import { SingleChoice } from "@/api";
import { getTranslation } from "./utils";

interface SingleChoiceProps {
  config: SingleChoice;
}

export function SingleChoiceUI({ config }: SingleChoiceProps) {
  return (
    <RadioGroup>
      {config.choices.map((choice, index) => (
        <Radio key={index} color="primary" value={index.toString()}>
          {getTranslation(choice)}
        </Radio>
      ))}
    </RadioGroup>
  );
}
