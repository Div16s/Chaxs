"use client";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import LoginModal from "@/components/auth/loginModal";

export default function Navbar({user}:{user: CustomUser | null}) {
  return (
    <nav className="w-full px-6 py-4 border-b border-sky-200 bg-sky-50/60 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-90 transition"
        >
          <img
            src="/images/logo1.jpeg"
            alt="Chaxs Logo"
            className="h-10 w-full rounded-md object-cover"
          />
        </Link>

        
        <div className="flex items-center gap-4 md:gap-6 text-sm font-medium">
          <Link
            href="/"
            className="text-sky-700 hover:text-sky-900 transition-colors"
          >
            Home
          </Link>
          <Link
            href="#features"
            className="text-sky-700 hover:text-sky-900 transition-colors"
          >
            Features
          </Link>

          {!user ? (
            <LoginModal />
          ) : (
            <Link href="/dashboard">
              <Button
                size="sm"
                className="bg-sky-600 text-white hover:bg-sky-700 transition"
              >
                Dashboard
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}