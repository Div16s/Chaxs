import Image from "next/image";
import Navbar from "@/components/base/navbar";
import HeroSection from "@/components/base/heroSection";
import FeatureSection from "@/components/base/featureSection";
import UserReviews from "@/components/base/userReviews";
import Footer from "@/components/base/footer";
import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "./api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
     <div className="min-h-screen flex flex-col ">
      {/* Header */}
      <Navbar user={session?.user ?? null}/>
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeatureSection />

      {/* User Reviews Section */}
      <UserReviews />

      {/* Footer */}
      <Footer />
    </div>
  );
}
