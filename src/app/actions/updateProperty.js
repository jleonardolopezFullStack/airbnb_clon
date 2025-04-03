"use server";

const { default: connectDB } = require("@/config/database");
const { default: Property } = require("@/models/Property");
import User from "@/models/User";
const { getServerSession } = require("next-auth");
const { revalidatePath } = require("next/cache");
const { redirect } = require("next/navigation");

async function updateProperty(propertyId, formData) {
  await connectDB();
  const session = await getServerSession();
  //console.log(session);

  const userExists = await User.findOne({ email: session.user.email });

  if (!userExists) {
    throw new Error("User Is not required");
  }

  const { _id } = userExists;

  const existingProperty = await Property.findById(propertyId);

  if (!existingProperty) throw new Error("Property Not Found");

  // Verify ownership
  if (existingProperty.owner.toString() !== _id.toString()) {
    throw new Error("Current User does not own this property");
  }

  const propertyData = {
    owner: userExists._id,
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

  const updatedProperty = await Property.findByIdAndUpdate(
    propertyId,
    propertyData
  );

  revalidatePath("/", "layout");
  redirect(`/properties/${updatedProperty._id}`);
}
export default updateProperty;
