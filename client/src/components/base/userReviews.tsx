import React from "react";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function UserReviews() {
  return (
    <section className="py-20 px-6 bg-sky-50">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-sky-900 mb-12">
        What Our Users Say
      </h2>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8 justify-center">
        <Card className="flex-1 p-6 md:p-8 bg-white border border-sky-100 shadow-md rounded-2xl">
          <p className="text-base text-sky-800 leading-relaxed italic">
            “Chaxs is a game-changer! The fastest way to start a chat.”
          </p>

          <div className="mt-6 flex flex-col items-center">
            <img
              src="/images/user1.png"
              alt="User 1"
              className="w-12 h-12 rounded-full shadow"
            />
            <div className="mt-2 text-sm font-semibold text-sky-900">
              John Doe, Developer
            </div>

            <div className="flex items-center mt-1 text-sky-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-sky-400 stroke-sky-400" />
              ))}
            </div>
          </div>
        </Card>

        <Card className="flex-1 p-6 md:p-8 bg-white border border-sky-100 shadow-md rounded-2xl">
          <p className="text-base text-sky-800 leading-relaxed italic">
            “The encryption is top-notch. I feel secure using Chaxs.”
          </p>

          <div className="mt-6 flex flex-col items-center">
            <img
              src="/images/user2.png"
              alt="User 2"
              className="w-12 h-12 rounded-full shadow"
            />
            <div className="mt-2 text-sm font-semibold text-sky-900">
              Jane Smith, Designer
            </div>

            <div className="flex items-center mt-1 text-sky-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-sky-400 stroke-sky-400" />
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}