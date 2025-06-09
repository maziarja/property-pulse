import Pagination from "@/components/Pagination";
import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";

const PropertiesPage = async ({ searchParams }, pageSize = 9) => {
  const { page = 1 } = await searchParams;
  await connectDB();

  const totalProperties = await Property.countDocuments();
  const skip = (page - 1) * pageSize;

  const properties = await Property.find({})
    .skip(skip >= 0 ? skip : 1)
    // .skip(skip)
    .limit(pageSize);

  const showPagination = totalProperties > pageSize;

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Recent Properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.length === 0 ? (
            <p>No Properties Found</p>
          ) : (
            properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))
          )}
        </div>
        {showPagination && (
          <Pagination
            totalProperties={totalProperties}
            page={page}
            pageSize={pageSize}
          />
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
