"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function MobileChatSidebar({
  users,
  currentUserId,
}: {
  users: Array<GroupChatUserType> | [];
  currentUserId: string;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-2 rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring">
          <Menu className="w-5 h-5 text-foreground" />
        </button>
      </SheetTrigger>

      <SheetContent side="left" className="bg-background text-foreground w-[260px] sm:w-72">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold text-muted-foreground">
            Users
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 mx-1 space-y-3 overflow-y-auto h-full pr-1">
          {users.length > 0 ? (
            users.map((user) => {
              const isMe = String(user.id) === currentUserId;

              return (
                <div
                  key={user.id}
                  className={`relative rounded-xl p-4 shadow-sm border transition ${
                    isMe
                      ? "bg-sky-100 border-sky-300"
                      : "bg-muted/50 border-muted"
                  }`}
                >
                  <p className="text-sm font-semibold text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Joined: {new Date(user.created_at).toLocaleDateString()}
                  </p>

                  {isMe && (
                    <span className="absolute top-2 right-3 text-xs px-2 py-0.5 bg-sky-300 text-white rounded-full">
                      You
                    </span>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-sm text-muted-foreground">No users yet.</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}