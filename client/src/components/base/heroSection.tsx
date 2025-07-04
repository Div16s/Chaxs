import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 py-24 sm:py-32 bg-sky-50">
      <div className="max-w-4xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-sky-800 mb-6 leading-tight">
          Seamless Chat Links with{" "}
          <span className="text-sky-500 underline decoration-sky-300">Chaxs</span>
        </h1>

        <p className="text-base sm:text-lg text-sky-700 mb-10">
          Instantly create secure, shareable chat links — no sign-up, no hassle. <br />
          Chaxs brings effortless, real-time communication to everyone.
        </p>

        <Link href="/dashboard">
          <Button
            size="lg"
            className="px-8 py-5 bg-sky-600 hover:bg-sky-700 text-white text-base font-semibold transition duration-200"
          >
            Start Chatting
          </Button>
        </Link>
      </div>

      <div className="mt-20 w-full max-w-3xl flex items-center justify-center bg-white rounded-2xl shadow-md p-6 border border-sky-100">
        <img
          src="/images/chaxs_illustration.png"
          alt="Chaxs Illustration"
          className="w-full max-w-3xl h-auto object-cover"
          loading="lazy"
        />
      </div>
    </section>
  );
}