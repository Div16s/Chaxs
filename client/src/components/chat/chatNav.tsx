import React, {useState, useEffect} from "react";
import MobileChatSidebar from "@/components/chat/mobileChatSideBar";

export default function ChatNav({
  chatGroup,
  users,
  user,
}: {
  chatGroup: GroupChatType;
  users: Array<GroupChatUserType> | [];
  user?: GroupChatUserType;
}) {
  const [chatUser, setChatUser] = useState<GroupChatUserType | undefined>(undefined);;
  useEffect(() => {
    const data = localStorage.getItem(chatGroup.id);
    if (data) {
      const pData = JSON.parse(data);
      setChatUser(pData);
    }
  }, [chatGroup.id]);
  return (
    <nav className="w-full flex justify-between items-center px-4 md:px-6 py-3 border-b bg-background/70 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-3 md:gap-4">
        <div className="md:hidden">
          <MobileChatSidebar users={users} currentUserId={chatUser?.id?.toString() ?? ""}/>
        </div>

        <h1 className="text-base md:text-xl font-semibold text-foreground tracking-tight">
          {chatGroup.title}
        </h1>
      </div>

      <div className="text-sm text-muted-foreground font-medium">
        {user?.name ?? "Anonymous"}
      </div>
    </nav>
  );
}