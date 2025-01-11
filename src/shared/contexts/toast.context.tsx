"use client";

import { createContext, ReactNode, useContext } from "react";
import { MessageInstance } from "antd/es/message/interface";
import { message } from "antd";

type TToastContextProps = {
  toast: MessageInstance;
};

const ToastContext = createContext<TToastContextProps | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, contextHolder] = message.useMessage();

  return (
    <ToastContext.Provider value={{ toast }}>
      {contextHolder} {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);

  if (ctx == null) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return ctx;
};
