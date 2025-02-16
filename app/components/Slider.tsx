import { Slider } from "@heroui/slider";
import { Slider as SliderConfig } from "@/api"

interface SliderProps {
  config: SliderConfig
}

export default function SliderUI({ config }: SliderProps) {
  return <div>
    test
    <Slider
      color="foreground"
      defaultValue={0.4}
      label="Temperature"
      maxValue={1}
      minValue={0}
      showSteps={true}
      size="md"
      step={0.1}
    />
  </div>
}