import React from "react";
import { useRouter } from "next/router";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { useState } from "react";

export const SignInWithEmail = () => {
  const { signIn, isLoaded, setSession } = useSignIn();
  const { signUp, isLoaded: signUpLoaded } = useSignUp();
  const [emailAddress, setEmailAddress] = useState("");
  const router = useRouter();
  const signInWithLink = async (e) => {
    e.preventDefault();
    if (!isLoaded) return null;
    // the catch here prints out the error.
    // if the user doesn't exist we will return a 422 in the network response.
    // so push that to the sign up.
    await signIn
      .create({
        strategy: "email_link",
        identifier: emailAddress,
        redirectUrl: `${window.location.origin}/`,
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });

    const firstFactor = signIn.supportedFirstFactors.find(
      (f) => f.strategy === "email_link"
    );

    if (firstFactor) {
      // this error needs type fixing, because typescript is dumb.
      const { emailAddressId } = firstFactor;
      const { startMagicLinkFlow, cancelMagicLinkFlow } =
        signIn.createMagicLinkFlow();

      const response = await startMagicLinkFlow({
        emailAddressId,
        redirectUrl: `${window.location.origin}/`,
      });

      const verification = response.firstFactorVerification;

      if (verification.status === "expired") {
        console.log("oops expired.");
      }

      cancelMagicLinkFlow();

      if (response.status === "complete") {
        setSession(response.createdSessionId, () => router.push(`/`));
      }
    } else {
      if (!signUpLoaded) return null;
      await signUp.create({
        emailAddress: emailAddress,
      });
      const { startMagicLinkFlow } = signUp.createMagicLinkFlow();

      const response = await startMagicLinkFlow({
        redirectUrl: `${window.location.origin}/`,
      });

      if (response.status === "complete") {
        setSession(signUp.createdSessionId, () => router.push("/"));
        return;
      }
    }
  };

  return (
    <form onSubmit={signInWithLink}>
      <input
        type="email"
        value={emailAddress}
        onChange={(e) => setEmailAddress(e.target.value)}
      />
      <button type="submit">Sign in with magic link</button>
    </form>
  );
};
