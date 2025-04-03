"use server";

import Message from "@/models/Message";

const { default: connectDB } = require("@/config/database");
const { default: User } = require("@/models/User");
const { getServerSession } = require("next-auth");
const { revalidatePath } = require("next/cache");

async function getUnreadMessageCount(messageId) {
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
    const count = await Message.countDocuments({
      recipient: userExists._id,
      read: false,
    });
    return { count };
  } catch (error) {
    console.error("Error al marcar mensaje leido:", error);
    return { success: false, error: error.message };
  }
}

export default getUnreadMessageCount;
