import { Slider } from "@heroui/slider";

import { Slider as SliderConfig } from "@/api";

interface SliderProps {
  config: SliderConfig;
}

export default function SliderUI({ config }: SliderProps) {
  return (
    <Slider
      marks={[...Array(config.steps)].map((_, i) => {
        return { value: i + 1, label: (i + 1).toString() };
      })}
      maxValue={config.steps}
      minValue={1}
      showSteps={true}
      size="sm"
    />
  );
}
