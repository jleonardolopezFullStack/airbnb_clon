"use server";

import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function addProperty(formData) {
  await connectDB();

  const session = await getServerSession();
  //console.log(session);

  const userExists = await User.findOne({ email: session.user.email });
  // Access all values from amenities and images
  const imageURL = [];

  const propertyData = {
    owner: userExists.id,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_feet: formData.get("square_feet"),
    amenities: formData.getAll("amenities"),
    rates: {
      nightly: formData.get("rates.nightly"),
      weekly: formData.get("rates.weekly"),
      monthly: formData.get("rates.monthly"),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
  };
  const images = formData.getAll("images").filter((image) => image.name !== "");

  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    // Convert to base64
    const imageBase64 = imageData.toString("base64");
    // Make request to Cloudinary
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageBase64}`,
      { folder: "propertypulse" }
    );
    imageURL.push(result.secure_url);
  }
  propertyData.images = imageURL;

  // console.log(propertyData);
  const newProperty = new Property(propertyData);
  await newProperty.save();

  console.log(newProperty);

  revalidatePath("/", "layout");
  redirect(`/properties/${newProperty._id}`);
}

export default addProperty;
