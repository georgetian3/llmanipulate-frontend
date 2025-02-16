import { useAppSelector } from "@/lib/hooks";
import { selectUser } from "@/lib/testSlice";
import { useRouter } from "next/router";
import { ReactNode } from "react";

export default function AuthPage({children}: {children: ReactNode}) {
    const user = useAppSelector(selectUser);
    const router = useRouter()
    if (user === null) {
        // router.replace()
    }
    
    return <>{children}</>
}