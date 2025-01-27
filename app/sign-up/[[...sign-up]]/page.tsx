import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignUp
      path="/sign-up"
      routing="path"
      signInUrl="/sign-in" // Ensures navigation back to the sign-in page
    />
  );
}
