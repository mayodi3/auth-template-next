import { Button } from "@/components/ui/button";
import { signUpWithGoogle } from "@/lib/oauth";
import Image from "next/image";
import React from "react";

const GoogleSignIn = ({ mode }: { mode: "signin" | "signup" }) => {
  return (
    <form action={signUpWithGoogle}>
      <Button type="submit" variant="outline" className="w-full">
        <Image
          src="/google.png"
          alt="Google logo"
          width={24}
          height={24}
          className="mr-2"
        />
        {mode === "signup" ? "Sign Up" : "Sign In"} with Google
      </Button>
    </form>
  );
};

export default GoogleSignIn;
