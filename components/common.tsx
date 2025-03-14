import { Spinner } from "@heroui/react";


export function Centered({ children }: { children?: React.ReactNode }) {
  return <div className="h-full w-full flex justify-center items-center" >
    {children}
  </div>
}


export function CenteredSpinner() {
  return (
    <Centered>
      <Spinner size="lg" />
    </Centered>
  )
}

