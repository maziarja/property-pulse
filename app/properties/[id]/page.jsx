import { auth } from "@/app/_lib/auth";
import { convertToObject } from "@/app/_utils/convertToObject";
import BookmarkButton from "@/components/BookmarkButton";
import PropertyContactForm from "@/components/PropertyContactForm";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyImages from "@/components/PropertyImages";
import ShareButtons from "@/components/ShareButtons";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import User from "@/models/User";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const propertyPage = async ({ params }) => {
  await connectDB();
  const session = await auth();
  const user = await User.findById(session?.user.id);
  const { id } = await params;
  const propertyDoc = await Property.findById(id).lean();
  const property = convertToObject(propertyDoc);
  if (!property)
    return (
      <h1 className="text-center text-2xl font-bold mt-10 ">
        Property Not Found
      </h1>
    );

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            className="text-blue-500 hover:text-blue-600 flex items-center"
            href="/"
          >
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div
            className={`grid grid-cols-1 ${
              session ? "md:grid-cols-[70%_28%]" : "md:grid-cols-1"
            } w-full gap-6`}
          >
            <PropertyDetails property={property} />
            {session && (
              <aside className="space-y-4">
                <BookmarkButton
                  property={property}
                  bookmarks={user?.bookmarks.toString() || []}
                />
                <ShareButtons property={property} />
                <PropertyContactForm property={property} />
              </aside>
            )}
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
};

export default propertyPage;
