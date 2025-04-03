"use server";

import NuevoBookmarks from "@/models/NuevoBookmarks";

const { default: connectDB } = require("@/config/database");
const { default: User } = require("@/models/User");
const { getServerSession } = require("next-auth");
const { revalidatePath } = require("next/cache");

async function bookmarkProperty(propertyId) {
  await connectDB();
  const session = await getServerSession();

  /* if(session || !session.id ){
    throw new Error('User Id is required')
} */

  const userExists = await User.findOne({ email: session.user.email });

  //console.log(userExists);

  if (!userExists) {
    throw new Error("User Is not required");
  }

  // console.log("PropertyId:" + propertyId);

  try {
    // Buscar si el usuario ya tiene un bookmark
    let bookmark = await NuevoBookmarks.findOne({ user: userExists._id });
    let response = null;

    if (!bookmark) {
      // Si no existe, creamos uno nuevo con el producto
      bookmark = await NuevoBookmarks.create({
        user: userExists._id,
        bookmarks: [propertyId],
      });
      response = bookmark;
    } else {
      // Si ya existe, verificamos si el producto está guardado

      if (bookmark.bookmarks.includes(propertyId.toString())) {
        // Si está en la lista, lo quitamos con filter
        // console.log("si ya esta en la lista");
        bookmark.bookmarks = bookmark.bookmarks.filter(
          (id) => id.toString() !== propertyId
        );
      } else {
        // Si no está en la lista, lo agregamos
        bookmark.bookmarks.push(propertyId);
      }
      response = await bookmark.save();
      // console.log("response is: " + response);
      // console.log("bookmark:" + bookmark);
    }
    revalidatePath("/", "layout");
    return {
      success: true,
      bookmarkId: response.bookmarks.map((id) => id.toString()),
    };
  } catch (error) {
    console.error("Error al actualizar bookmarks:", error);
    return { success: false, error: error.message };
  }
}

export default bookmarkProperty;
