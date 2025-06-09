"use server";

import connectDB from "@/config/database";
import { auth } from "../_lib/auth";
import Message from "@/models/Message";

export const getUnreadMessageCount = async () => {
  await connectDB();
  const session = await auth();

  if (!session) throw new Error("You need to logged in");

  const count = await Message.countDocuments({
    recipient: session.user.id,
    read: false,
  });

  return count;
};
