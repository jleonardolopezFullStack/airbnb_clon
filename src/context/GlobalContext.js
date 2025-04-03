"use client";

import getUnreadMessageCount from "@/app/actions/getUnreadMessageCount";
import { useSession } from "next-auth/react";

const { createContext, useContext, useState, useEffect } = require("react");

//Create Context
const GlobalContext = createContext();

// Create Provider
export function GlobalProvider({ children }) {
  const [unreadCount, setUnreadCount] = useState(0);
  const { data: session, status, update } = useSession();

  useEffect(() => {
    if (session) {
      getUnreadMessageCount().then((res) => {
        if (res.count) setUnreadCount(res.count);
      });
    }
  }, [getUnreadMessageCount, session]);

  return (
    <GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
