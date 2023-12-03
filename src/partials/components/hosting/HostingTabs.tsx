import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function HostingTabs() {
  return (
    <Tabs defaultValue="current" className="mt-6 full">
      <TabsList className="justify-between bg-white w-1/3">
        <TabsTrigger
          className="rounded-full px-4 py-2 border font-semibold"
          value="current"
        >
          Currently hosting
        </TabsTrigger>
        <TabsTrigger
          className="rounded-full px-4 py-2 border font-semibold"
          value="upcoming"
        >
          Upcoming
        </TabsTrigger>
        <TabsTrigger
          className="rounded-full px-4 py-2 border font-semibold"
          value="previous"
        >
          Previous
        </TabsTrigger>
      </TabsList>
      <TabsContent className="mt-6 p-4 rounded-md bg-[#F7F7F7]" value="current">
        Currently hosting
      </TabsContent>
      <TabsContent
        className="mt-6 p-4 rounded-md bg-[#F7F7F7]"
        value="previous"
      >
        Previous reservations
      </TabsContent>
      <TabsContent
        className="mt-6 p-4 rounded-md bg-[#F7F7F7]"
        value="upcoming"
      >
        Upcoming reservations
      </TabsContent>
    </Tabs>
  );
}

export default HostingTabs;
