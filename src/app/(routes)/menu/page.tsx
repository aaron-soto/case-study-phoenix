import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SectionHeading from "@/components/reusable/SectionHeading";

const MenuPage = () => {
  return (
    <section className="bg-[#0c0b09]">
      <div className="md:py-16">
        <div className="container">
          <SectionHeading title="Menu" description="Check out our menu" />

          <Tabs defaultValue="drinks" className="w-[400px] mt-8">
            <TabsList>
              <TabsTrigger value="drinks">Drinks</TabsTrigger>
              <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
            </TabsList>
            <TabsContent value="drinks">
              Drink Menu From Clover Here
            </TabsContent>
            <TabsContent value="breakfast">
              Breakfast Menu From Clover Here
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default MenuPage;
