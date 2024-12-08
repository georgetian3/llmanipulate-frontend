import { useState } from "react";
import "../styles/slider.css";


interface SliderProps {
  label?: string
  value: number
  onChange: (newValue: number) => void;
}

const MIN = 1
const MAX = 10
const STEP = 1
const RESET_CHARACTER = '\u21BA' // ↺

function SliderRange({limit}: {limit: number}) {
  return <div className="slider-range-limit">
    {limit.toString()}
  </div>
}

const SLIDER_STYLE = `
  appearance: none
  width: 16px;
  height: 16px;
  background: white; /* Pure white button */
  border-radius: 50%; /* Makes it circular */
  cursor: pointer;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2); /* Adds a subtle shadow */
`

export default function Slider({label, value, onChange}: SliderProps) {

  const [initialValue, setInitialValue] = useState<number>(NaN)
  if (Number.isNaN(initialValue)) {
    setInitialValue(value)
  }

  return <div className="slider">
    <div className="slider-label">
      <p className="slider-label-text">{label}</p>
      <div className="rounded-lg px-1 text-[#425675] bg-[#f3f5f7] border-neutral-700 border-3">
        <input
          type="number"
          min={MIN} max={MAX} step={STEP}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="text-[#425675] bg-[#f3f5f7] text-center cursor-pointer"
        />
        <button className="text-black p-0.5" onClick={() => onChange(initialValue)}>
          {RESET_CHARACTER}
        </button>
      </div>
    </div>
    <div className="slider-range">
      <SliderRange limit={MIN}/>
      <style>{SLIDER_STYLE}</style>
      <input
        type="range"
        min={MIN} max={MAX} step={STEP}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="debug w-full mx-2 bg-gray-200 rounded-lg cursor-pointer accent-orange-500 text-white border-0"
      />
      <SliderRange limit={MAX} />
    </div> 
  </div> 
}