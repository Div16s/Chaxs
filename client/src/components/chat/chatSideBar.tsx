import React from "react";

export default function ChatSidebar({
  users,
  currentUserId,
  onlineUserIds
}: {
  users: Array<GroupChatUserType> | [];
  currentUserId: string;
  onlineUserIds: string[];
}) {
  return (
    <aside className="hidden md:flex flex-col w-64 h-screen border-r border-muted px-4 py-6 bg-background">
      <h2 className="text-lg font-semibold text-muted-foreground mb-6">Users</h2>

      <div className="space-y-3 overflow-y-auto pr-2">
        {users.map((user) => {
          const isMe = String(user.id) === currentUserId;
          const isOnline = onlineUserIds.map(String).includes(String(user.id));
          return (
            <div
              key={user.id}
              className={`relative rounded-xl p-4 shadow-sm border transition ${
                isMe
                  ? "bg-sky-100 border-sky-300"
                  : "bg-muted/50 border-muted"
              }`}
            >
    
              {isOnline && (
                <span className="absolute top-3 left-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background z-10"></span>
              )}

              <p className="text-sm font-semibold text-foreground pl-5">{user.name}</p>

              <p className="text-xs text-muted-foreground mt-1 pl-5">
                Joined: {new Date(user.created_at).toLocaleDateString()}
              </p>

              {isMe && (
                <span className="absolute top-2 right-3 text-xs px-2 py-0.5 bg-sky-300 text-white rounded-full">
                  You
                </span>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}