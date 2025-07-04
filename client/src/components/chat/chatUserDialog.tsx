"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";
import axios from "axios";
import { CHAT_GROUP_USERS } from "@/lib/apiEndPoints";
import { toast } from "sonner";

export default function ChatUserDialog({
  open,
  setOpen,
  group,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  group: GroupChatType;
}) {
  const params = useParams();
  const [state, setState] = useState({
    name: "",
    passcode: "",
  });

  useEffect(() => {
    const data = localStorage.getItem(params["id"] as string);
    if (data) {
      const jsonData = JSON.parse(data);
      if (jsonData?.name && jsonData?.group_id) {
        setOpen(false);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (group.passcode !== state.passcode) {
      toast.error("Invalid passcode. Please try again.");
      return;
    }

    try {
      const localData = localStorage.getItem(params["id"] as string);

      if (!localData) {
        const { data } = await axios.post(CHAT_GROUP_USERS, {
          name: state.name,
          group_id: params["id"] as string,
        });

        localStorage.setItem(params["id"] as string, JSON.stringify(data?.data));
        toast.success("Welcome to the group!");
      }

      setTimeout(() => {
        setOpen(false);
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="bg-background border border-muted shadow-xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Join Group
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Please enter your name and passcode to access this chat group.
            If you don’t have one, contact the group admin.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            placeholder="Your Name"
            value={state.name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
            className="bg-muted/50 placeholder:text-muted-foreground focus-visible:ring-ring"
          />
          <Input
            placeholder="Passcode"
            value={state.passcode}
            onChange={(e) => setState({ ...state, passcode: e.target.value })}
            className="bg-muted/50 placeholder:text-muted-foreground focus-visible:ring-ring"
          />

          <Button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white rounded-md"
          >
            Join Now
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}