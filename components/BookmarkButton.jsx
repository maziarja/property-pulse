"use client";

import { bookmarkProperty } from "@/app/actions/bookmarkProperty";
import { useTransition } from "react";
import { useFormStatus } from "react-dom";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { toast } from "react-toastify";

//  v1 to get pending
// const BookmarkButton = ({ property }) => {
//   const bookmarkPropertyWithData = bookmarkProperty.bind(null, property);
//   return (
//     <form action={bookmarkPropertyWithData}>
//       <Btn />
//     </form>
//   );
// };
// export default BookmarkButton;

// const Btn = () => {
//   const { pending } = useFormStatus();
//   return (
//     <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
//       <FaBookmark className="mr-2" /> Bookmark Property
//       {pending && "..."}
//     </button>
//   );
// };

// v2 to get pending
const BookmarkButton = ({ property, bookmarks }) => {
  const [isPending, startTransition] = useTransition();
  const isBookmarked = bookmarks.includes(property._id);

  function handleBookmarkProperty() {
    startTransition(async () => {
      const result = await bookmarkProperty(property);
      if (result) toast.success(result.message);
    });
  }

  return (
    <>
      {isBookmarked ? (
        <button
          onClick={handleBookmarkProperty}
          className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
          disabled={isPending}
        >
          <FaBookmark className="mr-2" />
          Remove Bookmark
        </button>
      ) : (
        <button
          onClick={handleBookmarkProperty}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
          disabled={isPending}
        >
          <FaRegBookmark className="mr-2" />
          Bookmark Property
        </button>
      )}
    </>
  );
};
export default BookmarkButton;
