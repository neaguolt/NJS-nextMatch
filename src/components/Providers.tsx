'use client' // this is now registred as a client component

import { NextUIProvider } from "@nextui-org/react";
import { ReactNode, use } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Providers({children}:{children: ReactNode}) {
  return (
    <NextUIProvider>
      <ToastContainer position='bottom-right' hideProgressBar className='z-50'/>
      {children}
    </NextUIProvider>
  )
}