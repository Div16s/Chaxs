import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import GroupChatCardMenu from "@/components/groupChat/groupChatCardMenu";

export default function GroupChatCard({
  group,
  user,
}: {
  group: GroupChatType;
  user: CustomUser;
}) {
  return (
    <Card className="rounded-2xl border bg-sky-50 border-sky-200 hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <CardTitle className="text-lg font-semibold text-sky-800">
          {group.title}
        </CardTitle>
        <GroupChatCardMenu user={user} group={group} />
      </CardHeader>

      <CardContent className="space-y-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sky-700">Passcode:</span>
          <span className="text-xs font-mono bg-background px-2 py-1 rounded-md border border-muted">
            {group.passcode}
          </span>
        </div>

        <div className="text-xs text-muted-foreground">
          <span className="text-sky-700 font-medium">Created on:</span>{" "}
          {new Date(group.created_at).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      </CardContent>
    </Card>
  );
}