import { TypographyH1 } from "@/components/h1";
import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <PageContainer>
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <TypographyH1>Home</TypographyH1>
          <Link href="/check-worth">
            <Button size="lg">Check worth</Button>
          </Link>
        </div>
      </PageContainer>
    </>
  );
}
