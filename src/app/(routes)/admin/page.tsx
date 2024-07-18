import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import EventSection from "@/components/sections/admin/EventSection";
import { Skeleton } from "@/components/ui/skeleton";

const AdminPage = () => {
  return (
    <>
      <div className="mb-8">
        <div className="container">
          <Tabs defaultValue="events" className="w-full">
            <TabsList className="w-full justify-start rounded-none bg-transparent border-b">
              <TabsTrigger className="rounded-none" value="events">
                Events
              </TabsTrigger>
              <TabsTrigger className="rounded-none" value="users">
                Users
              </TabsTrigger>
              <TabsTrigger className="rounded-none" value="hours">
                Hours
              </TabsTrigger>
              <TabsTrigger className="rounded-none" value="analytics">
                Analytics
              </TabsTrigger>
            </TabsList>
            <TabsContent value="events">
              <div className="py-8">
                <EventSection adminPage={true} />
              </div>
            </TabsContent>
            <TabsContent value="users" className="py-4">
              <Skeleton className="flex w-full justify-center items-center h-[500px]">
                <h1 className="text-2xl">Section Coming Soon</h1>
              </Skeleton>
            </TabsContent>
            <TabsContent value="hours" className="py-4">
              <Skeleton className="flex w-full justify-center items-center h-[500px]">
                <h1 className="text-2xl">Section Coming Soon</h1>
              </Skeleton>
            </TabsContent>
            <TabsContent value="analytics" className="py-4">
              <Skeleton className="flex w-full justify-center items-center h-[500px]">
                <h1 className="text-2xl">Section Coming Soon</h1>
              </Skeleton>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
