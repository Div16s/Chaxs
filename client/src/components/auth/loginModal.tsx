import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { DialogDescription } from "@radix-ui/react-dialog";

const handleGoogleLogin = async () => {
  signIn("google", {
    redirect: true,
    callbackUrl: "/",
  });
};

export default function LoginModal() {
  const handleGoogleLogin = () => {
    signIn("google", {
      callbackUrl: "/dashboard",
      redirect: true,
    })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-sm font-medium">
          Get Started
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm rounded-xl p-6 space-y-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-semibold text-foreground">
            Welcome to Chaxs
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Instantly create secure chat links and start real-time
            conversations with zero friction.
          </DialogDescription>
        </DialogHeader>

        <Button
          variant="outline"
          onClick={handleGoogleLogin}
          className="w-full justify-center gap-3 border border-border text-sm font-medium"
        >
          <Image
            src="/images/google.png"
            width={20}
            height={20}
            alt="Google Logo"
          />
          Continue with Google
        </Button>
      </DialogContent>
    </Dialog>
  );
}