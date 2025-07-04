import DashNav from '@/components/dashboard/dashNav'
import React from 'react'
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import CreateChat from '@/components/groupChat/createChat'
import { fetchChatGroups } from '@/fetch/groupFetch'
import GroupChatCard from '@/components/groupChat/groupChatCard'
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Dashboard = async () => {
    const session: CustomSession | null = await getServerSession(authOptions);
    const groups: Array<GroupChatType> | [] = await fetchChatGroups(session?.user?.token!);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashNav name={session?.user?.name!} image={session?.user?.image!} />

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-10 space-y-10">
        <section className="flex justify-between items-center">
          <h2 className="text-2xl md:text-3xl text-sky-800 font-bold tracking-tight">
            My Chats
          </h2>
          {session?.user && <CreateChat user={session.user} />}
        </section>

        <Separator />

        {/* Group Chat Cards */}
        <section>
          {groups.length === 0 ? (
            <Card>
              <CardContent className="text-center p-6 text-muted-foreground text-sm">
                You haven't created or joined any chat groups yet.
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map((group, index) => (
                <GroupChatCard
                  key={index}
                  group={group}
                  user={session?.user!}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default Dashboard