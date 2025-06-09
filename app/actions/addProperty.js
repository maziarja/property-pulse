"use server";

import connectDB from "@/config/database";
import { auth } from "../_lib/auth";
import Property from "@/models/Property";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import cloudinary from "@/config/cloudinary";

export const addProperty = async function (formData) {
  await connectDB();
  const session = await auth();
  if (!session?.user) throw new Error("User ID is required");

  const amenities = formData.getAll("amenities");
  const images = formData.getAll("images").filter((image) => image.name !== "");
  const property = {
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
    amenities,
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

  // Cloudinary image
  const imageUrls = [];

  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    // Convert to base64
    const imageBase64 = imageData.toString("base64");

    // Make request to cloudinary
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageBase64}`,
      {
        folder: "propertypulse",
      }
    );
    imageUrls.push(result.secure_url);
  }
  property.images = imageUrls;

  // we can not use this because we need the id of this new property
  //   await Property.create(property);
  const newProperty = new Property(property);
  newProperty.save();

  revalidatePath("/", "layout");
  redirect(`/properties/${newProperty._id}`);
};
