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

import {
  signIn,
  signUp,
} from "@/src/lib/supabase/auth";

type AccountMode =
  | "signin"
  | "signup";

type RegistrationState =
  | "form"
  | "confirmation";

export default function AccountAccess() {
  const {
    user,
    loading,
  } = useAuth();

  const router = useRouter();
  const pathname = usePathname();

  const [mode, setMode] =
    useState<AccountMode>("signin");

  const [
    registrationState,
    setRegistrationState,
  ] = useState<RegistrationState>(
    "form"
  );

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (!user) {
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setFirstName("");
      setLastName("");
      setShowPassword(false);
      setShowConfirmPassword(false);
      setError("");
      setSubmitting(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      router.replace(pathname);
      router.refresh();
    }
  }, [user, pathname, router]);

  if (loading) {
    return null;
  }

  function resetForm() {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    setError("");
    setSubmitting(false);
  }

  function switchToSignIn() {
    resetForm();
    setRegistrationState("form");
    setMode("signin");
  }

  function switchToSignUp() {
    resetForm();
    setRegistrationState("form");
    setMode("signup");
  }

  async function handleSignIn(
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

    if (!normalizedEmail.includes("@")) {
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

      setSubmitting(false);
    }
  }

  async function handleSignUp(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    const normalizedFirstName =
      firstName.trim();

    const normalizedLastName =
      lastName.trim();

    const normalizedEmail =
      email.trim();

    if (!normalizedFirstName) {
      setError(
        "Enter your first name."
      );
      return;
    }

    if (!normalizedLastName) {
      setError(
        "Enter your last name."
      );
      return;
    }

    if (!normalizedEmail) {
      setError(
        "Enter your email address."
      );
      return;
    }

    if (!normalizedEmail.includes("@")) {
      setError(
        "Enter a valid email address."
      );
      return;
    }

    if (!password) {
      setError(
        "Create a password."
      );
      return;
    }

    if (password.length < 6) {
      setError(
        "Your password must be at least 6 characters."
      );
      return;
    }

    if (!confirmPassword) {
      setError(
        "Confirm your password."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        "Your passwords do not match."
      );
      return;
    }

    setSubmitting(true);

    try {
      const redirectTo =
        `${window.location.origin}/auth/callback?next=/account/profile`;

      const data = await signUp(
        normalizedEmail,
        password,
        normalizedFirstName,
        normalizedLastName,
        redirectTo
      );

      /*
       * Supabase returns a session immediately
       * when email confirmation is not required.
       *
       * When confirmation is enabled, session
       * will normally be null and the user must
       * confirm their email first.
       */
      if (data.session) {
        router.replace(pathname);
        router.refresh();
        return;
      }

      setRegistrationState(
        "confirmation"
      );
      setSubmitting(false);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to create your account."
      );

      setSubmitting(false);
    }
  }

  if (
    mode === "signup" &&
    registrationState === "confirmation"
  ) {
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
              Check your email.
            </h2>

            <p
              className="
                max-w-md
                text-sm
                leading-7
                text-white/50
              "
            >
              We've sent a confirmation link
              to your email address. Confirm
              your account to complete your
              entry into the House.
            </p>

            <p
              className="
                max-w-md
                pt-2
                text-sm
                leading-7
                text-white/35
              "
            >
              {email.trim()}
            </p>
          </div>

          <div
            className="
              mt-14
              border-t
              border-white/10
              pt-10
            "
          >
            <button
              type="button"
              onClick={switchToSignIn}
              className="
                text-xs
                uppercase
                tracking-[0.3em]
                text-white/45

                transition-colors
                duration-300

                hover:text-white
              "
            >
              Return to Sign In
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (mode === "signup") {
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
              Join the House.
            </h2>

            <p
              className="
                max-w-md
                text-sm
                leading-7
                text-white/50
              "
            >
              Create your House Eleven account
              and begin your relationship with
              the House.
            </p>
          </div>

          <form
            onSubmit={handleSignUp}
            noValidate
            autoComplete="on"
            className="
              mt-14
              max-w-md
              space-y-10
            "
          >
            <div
              className="
                grid
                gap-10
                sm:grid-cols-2
              "
            >
              <Field>
                <FieldLabel
                  htmlFor="account-first-name"
                  required
                >
                  First Name
                </FieldLabel>

                <TextField
                  id="account-first-name"
                  name="first_name"
                  type="text"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(event) =>
                    setFirstName(
                      event.target.value
                    )
                  }
                  placeholder="First name"
                  disabled={submitting}
                  required
                />
              </Field>

              <Field>
                <FieldLabel
                  htmlFor="account-last-name"
                  required
                >
                  Last Name
                </FieldLabel>

                <TextField
                  id="account-last-name"
                  name="last_name"
                  type="text"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(event) =>
                    setLastName(
                      event.target.value
                    )
                  }
                  placeholder="Last name"
                  disabled={submitting}
                  required
                />
              </Field>
            </div>

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
                autoComplete="email"
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
                  autoComplete="new-password"
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

            <Field>
              <FieldLabel
                htmlFor="account-confirm-password"
                required
              >
                Confirm Password
              </FieldLabel>

              <div className="relative">
                <TextField
                  id="account-confirm-password"
                  name="confirm_password"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(
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
                    setShowConfirmPassword(
                      (visible) => !visible
                    )
                  }
                  disabled={submitting}
                  aria-label={
                    showConfirmPassword
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
                  {showConfirmPassword
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
                  ? "Creating..."
                  : "Create Account"}
              </Button>

              <FieldHint>
                Your information stays within
                House Eleven and helps us prepare
                your experience with the House.
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
              Already a resident?
            </p>

            <button
              type="button"
              onClick={switchToSignIn}
              className="
                mt-5
                text-xs
                uppercase
                tracking-[0.3em]
                text-white/45

                transition-colors
                duration-300

                hover:text-white
              "
            >
              Enter the House
            </button>
          </div>
        </div>
      </section>
    );
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
          onSubmit={handleSignIn}
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
              onClick={switchToSignUp}
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
            >
              Create an Account
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}