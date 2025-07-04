import React from "react";
import FeatureCard from "@/components/base/featureCard";
import { Rocket, Lock, MonitorSmartphone } from "lucide-react";

export default function FeatureSection() {
  return (
    <section
      id="features"
      className="py-20 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 bg-sky-50"
    >
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-sky-700">
          Powerful Features Built for You
        </h2>
        <p className="text-muted-foreground mt-2 text-base max-w-xl mx-auto">
          Everything you need to chat, collaborate, and stay connected — fast and securely.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <FeatureCard
          icon={<Rocket className="w-7 h-7 text-sky-500" />}
          title="Instant Setup"
          description="Generate a room link in seconds. No login, no wait."
        />
        <FeatureCard
          icon={<Lock className="w-7 h-7 text-sky-500" />}
          title="End-to-End Security"
          description="Keep your chats private with passcode protection."
        />
        <FeatureCard
          icon={<MonitorSmartphone className="w-7 h-7 text-sky-500" />}
          title="Cross-Platform"
          description="Access your chats anywhere on any device, seamlessly."
        />
      </div>
    </section>
  );
}