"use server";

import { auth } from "@/app/_lib/auth";
import connectDB from "@/config/database";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

export async function bookmarkProperty(property) {
  await connectDB();
  const session = await auth();
  const user = await User.findById(session.user.id);

  if (user.bookmarks.includes(property._id)) {
    try {
      await user.updateOne({ $pull: { bookmarks: property._id } });
      revalidatePath("/properties/saved", "page");
      return {
        message: "bookmark removed",
      };
    } catch (error) {
      console.error(error);
    }
  }

  if (!user.bookmarks.includes(property._id)) {
    try {
      await user.updateOne({ $addToSet: { bookmarks: property._id } });
      revalidatePath("/properties/saved", "page");
      return {
        message: "bookmark added",
      };
    } catch (error) {
      console.error(error);
    }
  }
}
