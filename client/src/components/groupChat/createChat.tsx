"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createChatSchema,
  createChatSchemaType,
} from "@/validations/chatSchema";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import axios, { AxiosError } from "axios";
import { CHAT_GROUP } from "@/lib/apiEndPoints";
import { toast } from "sonner";
import { clearCache } from "@/actions/common";
import { Plus } from "lucide-react";

export default function CreateChat({ user }: { user: CustomUser }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createChatSchemaType>({
    resolver: zodResolver(createChatSchema),
  });

  const onSubmit = async (payload: createChatSchemaType) => {
    
    try {
      setLoading(true);
      const { data } = await axios.post(CHAT_GROUP, payload, {
        headers: {
          Authorization: user.token,
        },
      });

      if (data?.message) {
        setOpen(false);
        toast.success(data?.message);
        clearCache("dashboard");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong.please try again!");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-sky-600 hover:bg-sky-700 text-white transition">
          <div className="flex items-center gap-1">
            <Plus className="ml-2 h-4 w-4 inline-block" />
            Create Chat
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent
        className="bg-background border border-muted rounded-xl"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Create your new Chat
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div>
            <Input
              placeholder="Enter title"
              {...register("title")}
              className="border border-muted focus:ring-2 focus:ring-sky-300 focus:outline-none"
            />
            {errors.title?.message && (
              <span className="text-sm text-red-500">{errors.title.message}</span>
            )}
          </div>

          <div>
            <Input
              placeholder="Enter passcode"
              {...register("passcode")}
              className="border border-muted focus:ring-2 focus:ring-sky-300 focus:outline-none"
            />
            {errors.passcode?.message && (
              <span className="text-sm text-red-500">{errors.passcode.message}</span>
            )}
          </div>

          <div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-600 hover:bg-sky-700 text-white transition disabled:opacity-60"
            >
              {loading ? "Processing..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}