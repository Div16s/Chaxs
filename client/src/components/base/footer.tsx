import React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border px-6 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        
        <div className="text-sm text-muted-foreground space-y-2">
          <div className="text-sky-900 font-semibold">© 2025 Chaxs. All rights reserved.</div>
          <div className="space-x-4">
            <Link
              href="/privacy-policy"
              className="hover:text-sky-700 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-sky-700 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>

        <div className="w-full md:w-auto space-y-3">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-sky-600" />
            <p className="text-sm font-medium text-sky-800">
              Subscribe for updates
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Input
              placeholder="Enter your email"
              className="bg-muted text-foreground placeholder:text-muted-foreground border border-border sm:min-w-[250px]"
            />
            <Button
              className="bg-sky-600 hover:bg-sky-700 text-white transition"
              type="submit"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}