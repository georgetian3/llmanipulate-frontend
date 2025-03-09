import { Slider } from "@heroui/slider";

import { Slider as SliderConfig } from "@/api";
import { useAppDispatch } from "@/lib/hooks";
import { setComponentResponse } from "@/lib/appSlice";

interface SliderProps {
  config: SliderConfig;
}

export default function SliderUI({ config }: SliderProps) {

  const dispatch = useAppDispatch()

  function handleInput(value: number | number[]) {
    if (typeof value !== "number") {
      value = value[0]
    }
    dispatch(setComponentResponse({ componentId: config.id, response: value }))
  }

  return (
    <Slider 
      aria-label="slider"
      marks={[...Array(config.steps)].map((_, i) => {
        return { value: i + 1, label: (i + 1).toString() };
      })}
      maxValue={config.steps}
      minValue={1}
      showSteps={true}
      size="sm"
      onChange={handleInput}
    />
  );
}
