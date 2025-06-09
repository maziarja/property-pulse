import connectDB from "@/config/database";
import { auth } from "../_lib/auth";
import { redirect } from "next/navigation";
import Message from "@/models/Message";
import { createKey } from "next/dist/shared/lib/router/router";
import MessageCard from "@/components/MessageCard";
import { convertToObject } from "../_utils/convertToObject";

const MessagesPage = async () => {
  await connectDB();
  const session = await auth();
  if (!session) redirect("/");

  //  we do this because we want to unread messages show first

  const readMessages = await Message.find({
    recipient: session?.user.id,
    read: true,
  })
    .sort({ createdAt: -1 })
    .populate("property")
    .populate("sender")
    .lean();

  const unreadMessages = await Message.find({
    recipient: session?.user.id,
    read: false,
  })
    .sort({ createdAt: -1 })
    .populate("property", "name")
    .populate("sender", "username")
    .lean();

  const messagesDoc = [...unreadMessages, ...readMessages];

  //   const messagesDoc = await Message.find({
  //     recipient: session?.user.id,
  //   })
  //     .sort({ createdAt: -1 })
  //     .populate("property", "name")
  //     .populate("sender", "username")
  //     .lean();

  const messages = convertToObject(messagesDoc);

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

          <div className="space-y-4">
            {messages.length === 0 ? (
              <p>You have no messages</p>
            ) : (
              messages.map((message) => (
                <MessageCard key={message._id} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagesPage;
