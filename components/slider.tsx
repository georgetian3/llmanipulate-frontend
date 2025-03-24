import { Slider } from "@heroui/react";

import { Slider as SliderConfig } from "@/api";
import { useAppDispatch } from "@/lib/hooks";
import { setComponentResponse } from "@/lib/appSlice";
import { useEffect } from "react";
import { getTranslation } from "./utils";

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

  useEffect(() => {
    handleInput(0)
  })

  config = {
    ...config,
    labels: undefined
  }

  return (
    <Slider
      aria-label="slider"
      marks={config.labels
        ? config.labels.map((label, i) => { return { value: i, label: getTranslation(label) } })
        : [...Array(config.steps)].map((_, i) => { return { value: i, label: (i + 1).toString() } })}
      maxValue={config.steps - 1}
      minValue={0}
      showSteps
      size="sm"
      onChange={handleInput}
    />
  );
}
