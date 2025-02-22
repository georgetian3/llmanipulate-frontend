import { Radio, RadioGroup } from "@heroui/radio";

import getTranslation from "./utils";

import { SingleChoice } from "@/api";

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
