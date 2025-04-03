"use server";

const { default: NuevoBookmarks } = require("@/models/NuevoBookmarks");
const { default: connectDB } = require("@/config/database");
const { default: User } = require("@/models/User");
const { getServerSession } = require("next-auth");
const { revalidatePath } = require("next/cache");

async function findBookmarks(propertyId) {
  await connectDB();
  const session = await getServerSession();

  /* if(session || !session.id ){
      throw new Error('User Id is required')
  } */

  const userExists = await User.findOne({ email: session.user.email });

  // console.log(userExists._id);

  if (!userExists) {
    throw new Error("User Is not required");
  }

  const response = await NuevoBookmarks.findOne({
    user: userExists._id,
  });
  // console.log(propertyId);
  // console.log("response is: " + response.bookmarks);

  if (response.bookmarks.includes(propertyId.toString())) {
    return {
      success: true,
    };
  } else {
  }
  return {
    success: false,
  };
}

export default findBookmarks;
