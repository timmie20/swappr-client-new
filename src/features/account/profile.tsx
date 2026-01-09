import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UserAvatarProfile } from "@/components/user-avatar-profile";
import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

interface ProfileFormData {
  firstname: string;
  lastname: string;
  email: string;
}

export default function Profile() {
  const { user } = useUser();

  const { register, handleSubmit } = useForm<ProfileFormData>({
    values: {
      firstname: user?.firstName || "",
      lastname: user?.lastName || "",
      email: user?.primaryEmailAddress?.emailAddress || "",
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    // Handle submit function - to be implemented later
    console.log(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle> Account Information</CardTitle>
        <CardDescription>
          Make changes to your account here. Click save when you&apos;re done.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-start gap-10 md:flex-row md:gap-16">
          <div className="flex w-full items-center justify-center md:block md:w-fit">
            <UserAvatarProfile
              showInfo={false}
              user={user}
              className="size-20 md:size-28"
            />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex-1 space-y-4"
          >
            <FieldGroup>
              <div className="flex flex-col gap-4">
                <Label
                  htmlFor="firstname"
                  className="w-32 shrink-0 text-sm font-medium whitespace-nowrap"
                >
                  FIRST NAME
                </Label>
                <Input
                  disabled
                  id="firstname"
                  {...register("firstname")}
                  className="border-border focus-visible:border-primary rounded-none border-0 border-b bg-transparent px-0 focus-visible:ring-0"
                />
              </div>
              <div className="flex flex-col gap-4">
                <Label
                  htmlFor="lastname"
                  className="w-32 shrink-0 text-sm font-medium whitespace-nowrap"
                >
                  LAST NAME
                </Label>
                <Input
                  disabled
                  id="lastname"
                  {...register("lastname")}
                  className="border-border focus-visible:border-primary rounded-none border-0 border-b bg-transparent px-0 focus-visible:ring-0"
                />
              </div>
              <div className="flex flex-col gap-4">
                <Label
                  htmlFor="email"
                  className="w-32 shrink-0 text-sm font-medium whitespace-nowrap"
                >
                  EMAIL
                </Label>
                <Input
                  disabled
                  id="email"
                  type="email"
                  {...register("email")}
                  className="border-border focus-visible:border-primary rounded-none border-0 border-b bg-transparent px-0 focus-visible:ring-0"
                />
              </div>
            </FieldGroup>

            <div className="flex justify-end">
              <Button
                type="submit"
                size="lg"
                disabled
                className="cursor-pointer"
              >
                Save changes
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
