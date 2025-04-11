import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import NuevoBookmarks from "@/models/NuevoBookmarks";
import Property from "@/models/Property";
import User from "@/models/User";
import { getServerSession } from "next-auth";

const SavedPropertiesPage = async () => {
  let filtered = [];
  const session = await getServerSession();
  const userExists = await User.findOne({ email: session.user.email });

  if (!userExists.id) {
    throw new Error("User ID is required");
  }

  /*   const { bookmarks } = await User.findById(userExists.id).populate(
    "bookmarks"
  ); */

  const { bookmarks } = await NuevoBookmarks.findOne({
    user: userExists.id /* userExists.id */,
  });

  if (!bookmarks || bookmarks === null)
    return <div>You don't have any bookmark already</div>;
  else {
    const allProducts = await Property.find();

    // Filtra los productos una vez que se cargan

    filtered = allProducts.filter((product) => bookmarks.includes(product.id));

    console.log("Los Datos filtrados son:" + filtered);
  }

  //console.log(bookmarks);
  /* 
  useEffect(() => {
    // Simula una función que trae todos los productos
    const fetchAllProducts = async () => {
      const data = await Property.find();
      setAllProducts(data);
      console.log(allProducts);
    };

    fetchAllProducts();
  }, []);
 */
  return (
    /*   <div>Save page</div> */
    <section>
      <div className="container lg:container m-auto px-4 py-6">
        <h1 className="text-2xl mb-4">Saved Properties</h1>
        {bookmarks.length === 0 ? (
          <p>No saved properties</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filtered.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertiesPage;
