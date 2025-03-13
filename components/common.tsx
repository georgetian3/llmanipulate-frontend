import { Spinner } from "@heroui/react";


export function Centered({ children }: { children: React.ReactNode }) {
  return <div className="h-full w-full flex justify-center" >
    {children}
  </div>
}

