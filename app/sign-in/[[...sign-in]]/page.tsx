import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      path="/sign-in"
      routing="path"
      signUpUrl="/sign-up" // Ensures navigation to the sign-up page
    />
  );
}
