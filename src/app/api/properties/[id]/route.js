import connectDB from "@/config/database";
import Property from "@/models/Property";

export const GET = async (request, { params }) => {
  try {
    await connectDB();
    console.log(params.id);
    // const property = true;
    const property = await Property.findById(params.id);

    if (!property) {
      return new Response("Properties not found", { status: 400 });
    } else {
    }

    return new Response(property, {
      status: 200,
    });
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
};
