import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up" // Ensures navigation to the sign-up page
      />
    </div>
  );
}
