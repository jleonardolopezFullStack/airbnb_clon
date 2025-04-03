import FeaturedProperties from "@/components/FeaturedProperties";
import Hero from "@/components/Hero";
import HomeProperties from "@/components/HomeProperties";
import InfoBoxes from "@/components/InfoBoxes";
import connectDB from "@/config/database";

export default function HomePage() {
  connectDB();

  return (
    <div className="text-3xl">
      <Hero></Hero>
      <InfoBoxes></InfoBoxes>
      <FeaturedProperties />
      <HomeProperties></HomeProperties>
    </div>
  );
}
