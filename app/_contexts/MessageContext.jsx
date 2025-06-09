"use client";
import { createContext, useContext, useState } from "react";

const MessageContext = createContext();

function MessageProvider({ children }) {
  const [msgCount, setMsgCount] = useState(0);
  return (
    <MessageContext.Provider
      value={{
        msgCount,
        setMsgCount,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}

function useMessage() {
  const context = useContext(MessageContext);
  if (context === undefined)
    throw new Error("Message context was used outside of message provider");
  return context;
}

export { MessageProvider, useMessage };
