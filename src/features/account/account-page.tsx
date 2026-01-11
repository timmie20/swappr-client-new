"use client";
import { TypographyP } from "@/components/p";
import GoRack from "@/components/route-back-btn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Profile from "./profile";
import Drafts from "./draft";
import { useRouter } from "next/navigation";

export default function AccountPage({ activeTab }: { activeTab: string }) {
  const router = useRouter();

  const handleTabChange = (value: string) => {
    router.push(`/account?tab=${value}`);
  };

  return (
    <div>
      <GoRack />
      <TypographyP className="font-inter font-semibold text-[#909293]">
        Account Settings
      </TypographyP>

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="mt-4 w-full"
      >
        <TabsList className="w-2/3 md:w-100">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Profile />
        </TabsContent>
        <TabsContent value="drafts">
          <Drafts />
        </TabsContent>
      </Tabs>
    </div>
  );
}
