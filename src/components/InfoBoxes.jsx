import InfoBox from "./InfoBox";

const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            heading="FOR RENTERS"
            buttonInfo={{
              text: "Browse Properties",
              link: "/property",
              backgroundColor: "bg-black",
            }}
          >
            Find your dream rental property. Bookmark properties and contact
            owners.
          </InfoBox>
          <InfoBox
            heading="FOR PROPERTY OWNERS"
            backgroundColor="bg-blue-100"
            buttonInfo={{
              text: "Add Property",
              link: "/property/add",
              backgroundColor: "bg-blue-500",
            }}
          >
            List your properties and reach potential tenants. Rent as an airbnb
            or long term.
          </InfoBox>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
