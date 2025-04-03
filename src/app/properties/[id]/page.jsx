import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import Link from "next/link";
import PropertyDetails from "@/components/PropertyDetails";

import { FaArrowLeft } from "react-icons/fa";
import PropertyImages from "@/components/PropertyImages";
import PropertyContactForm from "@/components/PropertyContactForm";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";

const PropertyPage = async ({ params, searchParams }) => {
  /*   const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const pathName = usePathname(); */

  await connectDB();
  const property = await Property.findById(params.id).lean();

  if (!property) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property Not Found
      </h1>
    );
  }

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>
      {/*    <div className="grid grid-cols-5 gap-4 bg-red-500"> */}
      <section className="bg-blue-50">
        <div className=" grid grid-cols-5 gap-4 container m-auto py-10 px-6">
          <div
            className="col-span-3" /* "grid grid-cols-1 md:grid-cols-70/30 w-full gap-6" */
          >
            <PropertyDetails property={JSON.parse(JSON.stringify(property))} />
          </div>
          <aside className=" col-span-2 space-y-4">
            <BookmarkButton property={JSON.parse(JSON.stringify(property))} />
            <ShareButtons property={JSON.parse(JSON.stringify(property))} />
            <PropertyContactForm
              property={JSON.parse(JSON.stringify(property))}
            />
          </aside>
        </div>
      </section>
      {/*         <div className="col-span-2 m-auto py-10 px-6 bg-blue-50 w-full">
          <PropertyContactForm
            property={JSON.parse(JSON.stringify(property))}
          />
        </div> */}
      {/*    </div> */}

      <PropertyImages images={property.images} />
    </>
  );
};

export default PropertyPage;
