import { auth } from "@/app/_lib/auth";
import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import User from "@/models/User";
import { redirect } from "next/navigation";

const SavedPropertiesPage = async () => {
  await connectDB();
  const session = await auth();
  if (!session) redirect("/");
  const { bookmarks } = await User.findById(session.user.id).populate(
    "bookmarks"
  );

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Your Saved Properties</h1>
        {bookmarks.length === 0 ? (
          <p>No saved properties</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bookmarks.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertiesPage;
