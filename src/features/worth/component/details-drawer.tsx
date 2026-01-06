import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  IconFileDownload,
  IconLayoutBottombarInactive,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export default function DetailsDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="cursor-pointer">
          View Details <IconLayoutBottombarInactive />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Details</DrawerTitle>
            <DrawerDescription>
              These are the details your phone&apos;s worth calcalution
            </DrawerDescription>
          </DrawerHeader>

          <div></div>

          <DrawerFooter>
            <Button className="cursor-pointer">
              Download <IconFileDownload />
            </Button>
            <DrawerClose>Cancel</DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
