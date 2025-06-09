import Link from "next/link";

const Pagination = ({ page, totalProperties, pageSize }) => {
  const numberOfPages = Math.ceil(totalProperties / pageSize);
  if (page > numberOfPages) return null;
  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      {page > 1 && (
        <Link
          className="mr-2 px-2 py-1 border border-gray-300 rounded"
          href={`/properties?page=${Number(page) - 1}`}
        >
          Previous
        </Link>
      )}

      <span className="mx-2">
        {" "}
        Page {page > 0 ? page : 1} of {numberOfPages}
      </span>

      {page < numberOfPages && (
        <Link
          className="ml-2 px-2 py-1 border border-gray-300 rounded"
          href={`/properties?page=${Number(page) + 1}`}
        >
          Next
        </Link>
      )}
    </section>
  );
};

export default Pagination;
