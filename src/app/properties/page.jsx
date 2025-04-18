import Pagination from "@/components/Pagination";
import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";
//import { getServerSession } from "next-auth";

const PropertyPage = async ({ searchParams }) => {
  // console.log(searchParams.page);
  const { page, pageSize } = await searchParams;
  // const pageSize = 3;
  //console.log(page);
  await connectDB();
  const skip = (page - 1) * pageSize;
  const total = await Property.countDocuments({});
  const properties = await Property.find({}).skip(skip).limit(pageSize);
  // const session = await getServerSession();
  //console.log(session);
  // console.log(properties);
  const showPagination = total > pageSize;
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
              ></PropertyCard>
            ))}
          </div>
        )}
        {showPagination && (
          <Pagination
            page={parseInt(page)}
            pageSize={parseInt(pageSize)}
            totalItems={total}
          />
        )}
      </div>
    </section>
  );
};

export default PropertyPage;
