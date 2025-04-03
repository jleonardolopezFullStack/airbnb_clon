"use server";

import User from "@/models/User";

const { default: cloudinary } = require("@/config/cloudinary");
const { default: connectDB } = require("@/config/database");
const { default: Property } = require("@/models/Property");
const { getServerSession } = require("next-auth");
const { revalidatePath } = require("next/cache");

async function deleteProperty(propertyId) {
  const session = await getServerSession();
  //console.log(session);

  const userExists = await User.findOne({ email: session.user.email });

  if (!userExists) {
    throw new Error("User Is not Register");
  }

  const { _id } = userExists;

  const property = await Property.findById(propertyId);

  if (!property) throw new Error("Property Not Found");

  //console.log(_id.toString());
  //console.log("owner:" + property.owner.toString());

  // Verify ownership
  if (property.owner.toString() !== _id.toString()) {
    throw new Error("Unauthorized");
  }
  //Extract public ID from image URLs

  const publicIds = property.images.map((imageUrl) => {
    const parts = imageUrl.split("/");
    return parts.at(-1).split(".").at(0);
  });

  // Delete images from Cloudinary

  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy("propertypulse/" + publicId);
    }
  }

  await property.deleteOne();

  revalidatePath("/", "layout");
}

export default deleteProperty;
