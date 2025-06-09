"use server";

import connectDB from "@/config/database";
import { auth } from "../_lib/auth";
import Message from "@/models/Message";

export async function addMessage(prevState, formData) {
  await connectDB();
  const session = await auth();
  if (!session) throw new Error("You must login");
  const recipient = formData.get("recipient");

  if (session?.user.id === recipient) {
    return { error: "You can not send a message to yourself" };
  }

  const message = {
    sender: session.user.id,
    recipient,
    property: formData.get("property"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    body: formData.get("message"),
  };

  const newMessage = new Message(message);
  await newMessage.save();

  return { submitted: true };
}
