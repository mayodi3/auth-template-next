"use server";

import { headers } from "next/headers";
import { createAdminClient } from "./appwrite";
import { OAuthProvider } from "node-appwrite";
import { redirect } from "next/navigation";

export async function signUpWithGoogle() {
  const { account } = await createAdminClient();
  const origin = (await headers()).get("origin");

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Google,
    `${origin}/oauth`,
    `${origin}/signup`
  );

  return redirect(redirectUrl);
}
