'use client' // this is now registred as a client component

import { NextUIProvider } from "@nextui-org/react";
import { ReactNode, use } from "react";

export default function Providers({children}:{children: ReactNode}) {
  return (
    <NextUIProvider>
        {children}
    </NextUIProvider>
  )
}