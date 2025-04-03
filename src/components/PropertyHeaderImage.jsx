import Image from "next/image";

const PropertyHeaderImage = ({ image }) => {
  //console.log(image);
  return (
    <>
      <section>
        <div className="container-xl m-auto">
          <div className="grid grid-cols-1">
            <Image
              src={image}
              alt=""
              className="object-cover h-[400px] w-full"
              width={0}
              height={0}
              sizes="100vw"
            />
          </div>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6"></div>
        </div>
      </section>{" "}
    </>
  );
};

export default PropertyHeaderImage;
