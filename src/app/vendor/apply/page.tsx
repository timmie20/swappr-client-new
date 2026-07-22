import { AppNavbar } from "@/components/shared/nav/app-navbar";
import { ApplicationWizard } from "@/features/vendor-application";

export default function ApplyPage() {
  return (
    <main className="w-full">
      <AppNavbar />
      <ApplicationWizard />
    </main>
  );
}
