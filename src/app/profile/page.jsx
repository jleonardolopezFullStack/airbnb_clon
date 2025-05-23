import connectDB from "@/config/database";
import Property from "@/models/Property";
import Image from "next/image";
import { signIn, signOut, useSession, getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import profileDefault from "@/assets/images/profile.png";
import User from "@/models/User";
import ProfileProperties from "@/components/ProfileProperties";

const ProfilePage = async () => {
  await connectDB();
  //const { data: session, status, update } = useSession();

  const session = await getServerSession();
  const userExists = await User.findOne({ email: session.user.email });
  const properties = await Property.find({
    owner: userExists._id,
  }).lean();

  // console.log(properties);

  if (!userExists.id) {
    throw new Error("User ID is required");
  }

  return (
    <>
      <section className="bg-blue-50">
        <div className="container m-auto py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 mx-20 mt-10">
                <div className="mb-4">
                  <Image
                    className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                    src={userExists.image || profileDefault}
                    width={200}
                    height={200}
                    alt="User"
                  />
                </div>

                <h2 className="text-2xl mb-4">
                  <span className="font-bold block">Name: </span>
                  {userExists.username}
                </h2>
                <h2 className="text-2xl">
                  <span className="font-bold block">Email: </span>
                  {userExists.email}
                </h2>
              </div>

              <div className="md:w-3/4 md:pl-4">
                <h2 className="text-xl font-semibold mb-4">Your Listings</h2>

                <ProfileProperties
                  properties={JSON.parse(JSON.stringify(properties))}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
