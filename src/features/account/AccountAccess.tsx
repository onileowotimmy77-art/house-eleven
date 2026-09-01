"use client";

import { useState, } from "react";

import { useAuth } from "@/components/providers/AuthProvider";

import {
  signIn,
  signUp,
} from "@/src/lib/supabase/auth";

export default function AccountAccess() {
  const { user, loading } = useAuth();

  const [mode, setMode] =
    useState<"signin" | "signup">("signin");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [submitting, setSubmitting] =
    useState(false);

  const [message, setMessage] =
    useState<string | null>(null);

  if (loading) {
    return null;
  }

  if (user) {
    return null;
  }

  async function handleSubmit(
    event: React.SubmitEvent
  ) {
    event.preventDefault();

    setSubmitting(true);
    setMessage(null);

    try {
      if (mode === "signup") {
        const data = await signUp(
          email,
          password
        );

        if (!data.session) {
          setMessage(
            "Account created. Check your email to confirm your address."
          );
        } else {
          setMessage(
            "Account created successfully."
          );
        }
      } else {
        await signIn(
          email,
          password
        );

        setMessage(
          "Signed in successfully."
        );
      }
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      className="
        border-t
        border-white/10
        pt-12
      "
    >
      <div className="max-w-xl space-y-8">
        <div className="space-y-6">
          <p
            className="
              font-mono
              text-[11px]
              uppercase
              tracking-[0.35em]
              text-white/35
            "
          >
            House Eleven Account
          </p>

          <h2
            className="
              text-3xl
              tracking-[-0.03em]
            "
          >
            {mode === "signin"
              ? "Enter the House."
              : "Create your account."}
          </h2>

          <p
            className="
              max-w-md
              text-sm
              leading-7
              text-white/50
            "
          >
            {mode === "signin"
              ? "Sign in to access your profile, saved pieces, addresses, and order history."
              : "Create an account to keep your House Eleven experience with you."}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="space-y-2">
            <label
              htmlFor="account-email"
              className="
                font-mono
                text-[10px]
                uppercase
                tracking-[0.3em]
                text-white/35
              "
            >
              Email
            </label>

            <input
              id="account-email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
              autoComplete="email"
              className="
                w-full
                border-b
                border-white/15
                bg-transparent
                py-3
                text-sm
                text-white
                outline-none
                transition-colors
                focus:border-white/50
              "
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="account-password"
              className="
                font-mono
                text-[10px]
                uppercase
                tracking-[0.3em]
                text-white/35
              "
            >
              Password
            </label>

            <input
              id="account-password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
              minLength={6}
              autoComplete={
                mode === "signin"
                  ? "current-password"
                  : "new-password"
              }
              className="
                w-full
                border-b
                border-white/15
                bg-transparent
                py-3
                text-sm
                text-white
                outline-none
                transition-colors
                focus:border-white/50
              "
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="
              pt-4
              font-mono
              text-[11px]
              uppercase
              tracking-[0.3em]
              text-white
              transition-opacity
              disabled:opacity-40
            "
          >
            {submitting
              ? "Processing"
              : mode === "signin"
                ? "Sign In"
                : "Create Account"}
          </button>
        </form>

        {message && (
          <p
            className="
              max-w-md
              text-sm
              leading-7
              text-white/50
            "
          >
            {message}
          </p>
        )}

        <button
          type="button"
          onClick={() => {
            setMode(
              mode === "signin"
                ? "signup"
                : "signin"
            );
            setMessage(null);
          }}
          className="
            font-mono
            text-[10px]
            uppercase
            tracking-[0.25em]
            text-white/35
            transition-colors
            hover:text-white
          "
        >
          {mode === "signin"
            ? "Create an account"
            : "Already have an account? Sign in"}
        </button>
      </div>
    </section>
  );
}