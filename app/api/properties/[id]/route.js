import connectDB from "@/config/database";
import Property from "@/models/Property";

export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const id = await params.id;
    console.log(id);
    const properties = await Property.findById(id);
    return new Response(properties, { status: 200 });
  } catch (error) {
    new Response("Something went wrong", { status: 500 });
  }
};
