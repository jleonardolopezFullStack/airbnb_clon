"use server";

import Message from "@/models/Message";

const { default: connectDB } = require("@/config/database");
const { default: User } = require("@/models/User");
const { getServerSession } = require("next-auth");
const { revalidatePath } = require("next/cache");

async function markMessageAsRead(messageId) {
  await connectDB();
  const session = await getServerSession();

  /* if(session || !session.id ){
    throw new Error('User Id is required')
} */

  const userExists = await User.findOne({ email: session.user.email });

  //console.log(userExists);

  if (!userExists) {
    throw new Error("User Is required");
  }

  // console.log("PropertyId:" + propertyId);

  try {
    const message = await Message.findById(messageId);

    if (!message) throw new Error("Message not found");

    // Verify ownership
    if (message.recipient.toString() !== userExists._id.toString()) {
      throw new Error("Unauthrozied ");
    }

    message.read = !message.read;

    revalidatePath("/messages", "page");

    await message.save();
    return message.read;
  } catch (error) {
    console.error("Error al marcar mensaje leido:", error);
    return { success: false, error: error.message };
  }
}

export default markMessageAsRead;
