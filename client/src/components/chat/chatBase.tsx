"use client";
import React, { useState, useEffect, useMemo, Fragment } from "react";
import ChatNav from "@/components/chat/chatNav";
import ChatUserDialog from "@/components/chat/chatUserDialog";
import ChatSidebar from "@/components/chat/chatSideBar";
import Chats from "@/components/chat/chats";
import { getSocket } from "@/lib/socket.config";

export default function ChatBase({
  group,
  users,
  oldMessages,
}: {
  group: GroupChatType;
  users: Array<GroupChatUserType> | [];
  oldMessages: Array<MessageType> | [];
}) {
  const [open, setOpen] = useState(true);
  const [chatUser, setChatUser] = useState<GroupChatUserType | undefined>(undefined);
  const [onlineUserIds, setOnlineUserIds] = useState<string[]>([]);

  const socket = useMemo(() => {
    const s = getSocket();
    s.auth = {
      room: group.id,
      userId: chatUser?.id,
    };
    return s.connect();
  }, [chatUser]);

  useEffect(() => {
    socket.on("online-users", (onlineIds: string[]) => {
      setOnlineUserIds(onlineIds);
    });

    console.log("Online user IDs:", onlineUserIds);

    return () => {
      socket.off("online-users");
    };
  }, [socket, setOnlineUserIds, onlineUserIds]);

  useEffect(() => {
    const data = localStorage.getItem(group.id);
    if (data) {
      const pData = JSON.parse(data);
      setChatUser(pData);
    }
  }, [group.id]);
  return (
    <div className="flex h-screen bg-background text-foreground">
      <ChatSidebar users={users} currentUserId={chatUser?.id?.toString() ?? ""} onlineUserIds={onlineUserIds}/>

      <main className="flex-1 flex flex-col border-l border-muted bg-white dark:bg-zinc-900">
        {open ? (
          <ChatUserDialog open={open} setOpen={setOpen} group={group} />
        ) : (
          <ChatNav chatGroup={group} users={users} user={chatUser} />
        )}

        <div className="flex-1 overflow-y-auto px-4 py-2">
          <Chats oldMessages={oldMessages} group={group} chatUser={chatUser} />
        </div>
      </main>
    </div>
  );
}