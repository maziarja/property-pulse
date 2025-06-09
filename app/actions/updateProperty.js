"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const { default: connectDB } = require("@/config/database");
const { auth } = require("../_lib/auth");
const { default: Property } = require("@/models/Property");

export async function updateProperty(propertyId, formData) {
  await connectDB();
  const session = await auth();
  if (!session) throw new Error("You need to logged in");
  const properties = await Property.find({ owner: session.user.id });
  if (properties.every((property) => property._id.toString() !== propertyId))
    throw new Error("You are not allowed to update this property");

  const updatedPropertyData = {
    owner: session?.user?.id,
    name: formData.get("name"),
    type: formData.get("type"),
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
      ...(formData.get("rates.nightly") && {
        nightly: formData.get("rates.nightly"),
      }),
      ...(formData.get("rates.weekly") && {
        weekly: formData.get("rates.weekly"),
      }),
      ...(formData.get("rates.monthly") && {
        monthly: formData.get("rates.monthly"),
      }),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
  };

  const updatedProperty = await Property.findByIdAndUpdate(
    propertyId,
    updatedPropertyData
  );
  revalidatePath("/", "layout");
  redirect(`/properties/${updatedProperty._id}`);
}
