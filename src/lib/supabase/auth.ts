import { supabase } from "./client";

export async function signUp(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  redirectTo: string
) {
  const { data, error } =
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectTo,
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

  if (error) {
    throw new Error(
      `Failed to create account: ${error.message}`
    );
  }

  return data;
}

export async function signIn(
  email: string,
  password: string
) {
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) {
    throw new Error(
      `Failed to sign in: ${error.message}`
    );
  }

  return data;
}

export async function signOut() {
  const { error } =
    await supabase.auth.signOut();

  if (error) {
    throw new Error(
      `Failed to sign out: ${error.message}`
    );
  }
}

export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(
      `Failed to get current user: ${error.message}`
    );
  }

  return user;
}