import { SignInWithEmail } from "@/components/SignInWithEmail";
import { SignInWithGitHub } from "@/components/SignInWithGitHub";


export default function SignIn() {
  return (
    <>
      <SignInWithGitHub />
      <SignInWithEmail />
    </>
  )
}
