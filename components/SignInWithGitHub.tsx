import { useSignIn } from "@clerk/clerk-react";
import type { OAuthStrategy } from "@clerk/types";

export const SignInWithGitHub = () => {
  const { signIn, isLoaded } = useSignIn();
  // sign in or up with Github.
  const signInWith = async (strategy: OAuthStrategy) => {
    if (!isLoaded) return null;
    try {
      signIn.authenticateWithRedirect({
        strategy,
        // see sso-calback.tsx
        redirectUrl: "/sso-callback",
        //set this to the home page.
        redirectUrlComplete: "/",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={() => signInWith("oauth_github")}>
        Sign in with Github
      </button>
    </div>
  );
};
