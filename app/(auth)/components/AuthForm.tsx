"use client";

import { useActionState } from "react";
import { signInWithEmail, signUpWithEmail } from "../actions/actions";
import { AuthActionState } from "../types";
import GoogleSignIn from "./GoogleSignIn";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Form } from "@/app/components/Form";

interface AuthFormProps {
  mode: "signup" | "signin";
}

const AuthForm = ({ mode }: AuthFormProps) => {
  const [state, formAction, isPending] = useActionState<
    AuthActionState,
    FormData
  >(
    async (prevState, formData) => {
      const action = mode === "signup" ? signUpWithEmail : signInWithEmail;
      return action(prevState, formData);
    },
    { errors: {} },
  );

  const fields = [
    ...(mode === "signup"
      ? [
          {
            name: "name",
            label: "Name",
            type: "text" as const,
            placeholder: "Your name",
            required: true,
            hint: "Enter your full name (as it appears on your id, passport or driver's license).",
          },
        ]
      : []),
    {
      name: "email",
      label: "Email",
      type: "email" as const,
      placeholder: "example@gmail.com",
      required: true,
      hint:
        mode === "signup"
          ? "Use a valid email address. You will need to verify this later"
          : "",
    },
    {
      name: "password",
      label: "Password",
      type: "password" as const,
      placeholder: "********",
      required: true,
      hint:
        mode === "signup"
          ? "Your password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one special character (like !@#$%^&*)."
          : "",
    },
    ...(mode === "signup"
      ? [
          {
            name: "confirmPassword",
            label: "Confirm Password",
            type: "password" as const,
            placeholder: "********",
            required: true,
            hint: "Re-enter your password to confirm.",
          },
        ]
      : []),
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {mode === "signup" ? "Create an account" : "Welcome back"}
          </CardTitle>
          <CardDescription className="text-center">
            {mode === "signup"
              ? "Enter your details to create your account"
              : "Enter your credentials to access your account"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form
            fields={fields}
            onSubmit={formAction}
            submitText={
              isPending
                ? "Processing..."
                : mode === "signup"
                  ? "Sign Up"
                  : "Sign In"
            }
            errors={state.errors}
          />
          {state.errors._form && (
            <p className="text-sm text-destructive mt-2">
              {state.errors._form[0]}
            </p>
          )}
          <div className="relative">
            <Separator />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-background px-2 text-muted-foreground text-sm">
                Or continue with
              </span>
            </div>
          </div>
          <GoogleSignIn mode={mode} />
        </CardContent>
        <CardFooter className="flex justify-center">
          {mode === "signup" ? (
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                className="underline text-primary font-medium"
                href="/signin"
              >
                Sign In
              </Link>
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                className="underline text-primary font-medium"
                href="/signup"
              >
                Sign Up
              </Link>
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthForm;
