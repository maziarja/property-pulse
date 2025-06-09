"use server";

import connectDB from "@/config/database";
import Property from "@/models/Property";
import { auth } from "../_lib/auth";
import { revalidatePath } from "next/cache";
import cloudinary from "@/config/cloudinary";

export const deleteProperty = async (id) => {
  await connectDB();
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const properties = await Property.find({ owner: session.user.id });

  if (properties.every((property) => property._id.toString() !== id))
    throw new Error("You are not allowed to delete this property");

  const property = await Property.findById(id);

  // deleting image from cloudinary
  const propertyImagesUrl = property.images.map((imageUrl) =>
    imageUrl.split("/").at(-1).split(".").at(0)
  );

  if (propertyImagesUrl.length > 0) {
    propertyImagesUrl.forEach(async (imageUrl) => {
      await cloudinary.uploader.destroy("propertypulse/" + imageUrl);
    });
  }

  // delete property
  //   await Property.deleteOne({ _id: id });

  //   we can do this too
  await property.deleteOne();

  revalidatePath("/", "layout");
};
