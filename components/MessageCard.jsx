"use client";

import { useMessage } from "@/app/_contexts/MessageContext";
import { deleteMessage } from "@/app/actions/deleteMessage";
import { markMessagesAsRead } from "@/app/actions/markMessageAsRead";
import { toast } from "react-toastify";

const MessageCard = ({ message }) => {
  const { msgCount, setMsgCount } = useMessage();

  async function handleMarkAsRead() {
    const read = await markMessagesAsRead(message._id);
    toast.success(`Marked as ${read ? "read" : "new"}`);
    if (read) setMsgCount((c) => c - 1);
    if (!read) setMsgCount((c) => c + 1);
  }

  async function handleDelete() {
    const confirm = window.confirm(
      "Are you sure you want to delete this message ?"
    );
    if (!confirm) return;
    const result = await deleteMessage(message._id);
    if (result) {
      toast.success("Message deleted successfully");
      setMsgCount(msgCount - 1);
    }
  }

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!message.read && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
          New
        </div>
      )}

      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry:</span>{" "}
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>
      <ul className="mt-4">
        <li>
          <strong>Reply Email:</strong>{" "}
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>{" "}
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong>{" "}
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        onClick={handleMarkAsRead}
        className={`mt-4 mr-3 text-white ${
          !message.read ? "bg-blue-500 " : "bg-red-500"
        } py-1 px-3 rounded-md`}
      >
        {!message.read ? "Mark As Read" : "Mark As Unread"}
      </button>
      <button
        onClick={handleDelete}
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
