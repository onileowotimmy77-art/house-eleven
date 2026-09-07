"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";
import {
  usePathname,
  useRouter,
} from "next/navigation";

import { useAuth } from "@/components/providers/AuthProvider";

import Button from "@/components/ui/Button";

import Field from "@/components/fields/Field";
import FieldError from "@/components/fields/FieldError";
import FieldHint from "@/components/fields/FieldHint";
import FieldLabel from "@/components/fields/FieldLabel";
import TextField from "@/components/fields/TextField";

import { signIn } from "@/src/lib/supabase/auth";

export default function AccountAccess() {
  const {
    user,
    loading,
  } = useAuth();

  const router = useRouter();
  const pathname = usePathname();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (!user) {
      setEmail("");
      setPassword("");
      setShowPassword(false);
      setError("");
      setSubmitting(false);
    }
  }, [user]);

  if (loading) {
    return null;
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    const normalizedEmail =
      email.trim();

    if (!normalizedEmail) {
      setError(
        "Enter your email address."
      );
      return;
    }

    if (
      !normalizedEmail.includes("@")
    ) {
      setError(
        "Enter a valid email address."
      );
      return;
    }

    if (!password) {
      setError(
        "Enter your password."
      );
      return;
    }

    setSubmitting(true);

    try {
      await signIn(
        normalizedEmail,
        password
      );

      router.replace(pathname);
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to enter the House."
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
      <div className="max-w-xl">
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
            Enter the House.
          </h2>

          <p
            className="
              max-w-md
              text-sm
              leading-7
              text-white/50
            "
          >
            Sign in to access your profile,
            saved pieces, addresses, and order
            history.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          autoComplete="on"
          className="
            mt-14
            max-w-md
            space-y-10
          "
        >
          <Field>
            <FieldLabel
              htmlFor="account-email"
              required
            >
              Email
            </FieldLabel>

            <TextField
              id="account-email"
              name="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              placeholder="you@example.com"
              disabled={submitting}
              required
            />
          </Field>

          <Field>
            <FieldLabel
              htmlFor="account-password"
              required
            >
              Password
            </FieldLabel>

            <div className="relative">
              <TextField
                id="account-password"
                name="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                autoComplete="current-password"
                value={password}
                onChange={(event) =>
                  setPassword(
                    event.target.value
                  )
                }
                placeholder="••••••••"
                disabled={submitting}
                required
                className="pr-20"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (visible) => !visible
                  )
                }
                disabled={submitting}
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
                className="
                  absolute
                  right-0
                  bottom-3

                  text-[10px]
                  uppercase
                  tracking-[0.25em]

                  text-white/30

                  transition-colors
                  duration-300

                  hover:text-white

                  disabled:cursor-not-allowed
                  disabled:text-white/15
                "
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </button>
            </div>
          </Field>

          {error && (
            <FieldError>
              {error}
            </FieldError>
          )}

          <div className="space-y-5">
            <Button
              type="submit"
              disabled={submitting}
            >
              {submitting
                ? "Entering..."
                : "Enter the House"}
            </Button>

            <FieldHint>
              Your account keeps your orders,
              addresses, and personal details
              within the House.
            </FieldHint>
          </div>
        </form>

        <div
          className="
            mt-16
            border-t
            border-white/10
            pt-10
          "
        >
          <p
            className="
              font-mono
              text-[11px]
              uppercase
              tracking-[0.35em]
              text-white/35
            "
          >
            New to the House?
          </p>

          <div className="mt-5 space-y-4">
            <h3
              className="
                text-xl
                tracking-[-0.02em]
              "
            >
              Create an Account.
            </h3>

            <p
              className="
                max-w-md
                text-sm
                leading-7
                text-white/50
              "
            >
              Become a resident of House
              Eleven and keep your relationship
              with the House in one place.
            </p>

            <button
              type="button"
              className="
                pt-2
                text-xs
                uppercase
                tracking-[0.3em]
                text-white/55

                transition-colors
                duration-300

                hover:text-white
              "
              onClick={() => {
                setError("");
                setEmail("");
                setPassword("");
                setShowPassword(false);
              }}
            >
              Create an Account
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}