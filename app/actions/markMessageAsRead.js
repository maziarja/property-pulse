"use server";

import connectDB from "@/config/database";
import { auth } from "../_lib/auth";
import Message from "@/models/Message";
import { revalidatePath } from "next/cache";

export const markMessagesAsRead = async (messageId) => {
  await connectDB();
  const session = await auth();

  if (!session) throw new Error("You need to logged in");

  const message = await Message.findById(messageId);
  if (!message) throw new Error("Message not found");
  if (session.user.id !== message.recipient.toString()) {
    throw new Error("You are not allowed to mark as read this message");
  }
  message.read = !message.read;
  await message.save();

  revalidatePath("/messages", "page");

  return message.read;
};
