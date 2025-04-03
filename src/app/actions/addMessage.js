"use server";

import connectDB from "@/config/database";
import Message from "@/models/Message";
import User from "@/models/User";
import { getServerSession } from "next-auth";

async function addMessage(previousState, formData) {
  await connectDB();

  const session = await getServerSession();
  //console.log(session);

  const userExists = await User.findOne({ email: session.user.email });
  const recipient = formData.get("recipient");

  //console.log(userExists);
  if (userExists.id === recipient) {
    return { error: "You can not send a message to yourself" };
  }

  const newMessage = new Message({
    sender: userExists.id,
    recipient,
    property: formData.get("property"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    body: formData.get("body"),
  });

  await newMessage.save();
  return { submitted: true };
}

export default addMessage;
