## Example of Custom Flows For GitHub and Email Magic Links

This shows how to use GitHub and Clerk with custom flows, the tricky part is that Clerk only supports SignIn or SignUp for Email, so we have to do some error handling to deal with it.

### Requirements

1. You need to set your Clerk Dashboard to the following
    - Email Link needs to be enabled for sign up and Sign in.
    - Passwords needs to be disabled
    - Github OAuth enabled.


### The Code

Under `sign-in/[[..index].tsx` holds two components to make it easier to port.

- `components/SignInWithEmail` handles the magic links
- `components/SignInWithGithub` handles GitHub
- `sso-callback.tsx` handles Github redirect
