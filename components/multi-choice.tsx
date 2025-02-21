import { Checkbox, CheckboxGroup } from "@heroui/checkbox";

import getTranslation from "./utils";

import { MultiChoice } from "@/api";

interface MultiChoiceProps {
  config: MultiChoice;
}

export function MultiChoiceUI({ config }: MultiChoiceProps) {
  return (
    <CheckboxGroup>
      {config.choices.map((choice, index) => (
        <Checkbox key={index} value={index.toString()}>
          {getTranslation(choice)}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
