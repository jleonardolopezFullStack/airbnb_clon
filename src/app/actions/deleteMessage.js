"use server";

import Message from "@/models/Message";
import User from "@/models/User";

const { default: connectDB } = require("@/config/database");
const { getServerSession } = require("next-auth");
const { revalidatePath } = require("next/cache");

async function deleteMessage(messageId) {
  const session = await getServerSession();
  //console.log(session);

  const userExists = await User.findOne({ email: session.user.email });

  if (!userExists) {
    throw new Error("User Is not Register");
  }

  const message = await Message.findById(messageId);

  console.log(message.recipient.toString());
  console.log(userExists._id);

  if (message.recipient.toString() !== userExists._id.toString()) {
    throw new Error("Unauthorized");
  }

  await message.deleteOne();

  revalidatePath("/", "layout");
}

export default deleteMessage;
