"use client";
import { useMessage } from "@/app/_contexts/MessageContext";
import { getUnreadMessageCount } from "@/app/actions/getUnreadMessageCount";
import { useEffect } from "react";

const UnreadMessageCount = () => {
  const { msgCount, setMsgCount } = useMessage();
  async function handleUnreadMessageCount() {
    const unreadMessage = await getUnreadMessageCount();

    setMsgCount(unreadMessage);
  }

  useEffect(() => {
    handleUnreadMessageCount();
  }, []);

  if (msgCount === 0) return null;

  return (
    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
      {msgCount}
    </span>
  );
};

export default UnreadMessageCount;
