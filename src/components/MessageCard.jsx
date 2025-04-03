"use client";

import deleteMessage from "@/app/actions/deleteMessage";
import markMessageAsRead from "@/app/actions/markMessageAsRead";
import { useGlobalContext } from "@/context/GlobalContext";
import { useState } from "react";
import { toast } from "react-toastify";

const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDelete, setIsDelete] = useState(false);

  const { setUnreadCount } = useGlobalContext();

  const handleReadClick = async () => {
    const read = await markMessageAsRead(message._id);
    setIsRead(read);
    setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));
    toast.success(`Marked as ${read ? "Read" : "New"}`);
  };

  const handleDeleteClick = async () => {
    await deleteMessage(message._id);
    setIsDelete(true);
    setUnreadCount((prevCount) => (isRead ? prevCount : prevCount - 1));
    toast.success("Message Deleted");
  };

  if (isDelete) {
    return <p>Deleted message</p>;
  }

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-2 rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquirt:</span>{" "}
        {message.property.name}
      </h2>
      <p className="text-gray-700 ">{message.body}</p>
      <ul>
        <li>
          <strong>Replay Email:</strong>{" "}
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Replay Phone:</strong>{" "}
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
        onClick={handleReadClick}
        className="mt-4 mr-3 bg-blue-500 ext-white py-1 px-3 rounded-md"
      >
        {isRead ? "Mark As New" : "Mark As Read"}
      </button>
      <button
        onClick={handleDeleteClick}
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
