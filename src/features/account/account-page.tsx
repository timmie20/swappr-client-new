"use client";
import { TypographyP } from "@/components/typography/p";
import GoRack from "@/components/route-back-btn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Profile from "./profile";
import Drafts from "./draft";
import { useSearchParams } from "next/navigation";

export default function AccountPage() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const defaultTab = tab === "drafts" ? "drafts" : "profile";

  return (
    <div>
      <GoRack />
      <TypographyP className="font-inter font-semibold text-[#909293]">
        Account Settings
      </TypographyP>

      <Tabs defaultValue={defaultTab} className="mt-4 w-full">
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
