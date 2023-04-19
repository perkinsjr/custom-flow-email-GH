import { useClerk } from "@clerk/nextjs"
import { useEffect } from "react";
import { HandleOAuthCallbackParams } from "@clerk/types";
//handles Redirects and pushes them to the right place.
export default function SSOCallback(params: HandleOAuthCallbackParams) {
  const { handleRedirectCallback } = useClerk();

  useEffect(() => {
    handleRedirectCallback(params)
  }, [params]);
  return (<div>Loadding....</div>)
}
