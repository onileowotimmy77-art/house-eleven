"use client";

import {
  useEffect,
  useState,
} from "react";

import { useAuth } from "@/components/providers/AuthProvider";
import { supabase } from "@/src/lib/supabase/client";
import CommerceButton from "@/src/features/commerce/CommerceButton";

interface Profile {
  first_name: string;
  last_name: string;
  phone: string | null;
}

export default function ProfileInformation() {
  const { user, loading: authLoading } = useAuth();

  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [editing, setEditing] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const currentUser = user;

    let mounted = true;

    async function loadProfile() {
      const { data, error } = await supabase
        .from("profiles")
        .select("first_name, last_name, phone")
        .eq("id", currentUser.id)
        .maybeSingle();

      if (!mounted) {
        return;
      }

      if (error) {
        console.error(
          "Failed to load profile:",
          error
        );

        setProfile(null);
      } else {
        setProfile(data);

        setFirstName(
          data?.first_name ?? ""
        );

        setLastName(
          data?.last_name ?? ""
        );

        setPhone(
          data?.phone ?? ""
        );
      }

      setLoading(false);
    }

    loadProfile();

    return () => {
      mounted = false;
    };
  }, [user, authLoading]);

  if (authLoading || loading || !user) {
    return null;
  }

  const fullName = [
    profile?.first_name,
    profile?.last_name,
  ]
    .filter(Boolean)
    .join(" ");

  function handleEdit() {
    setError(null);

    setFirstName(
      profile?.first_name ?? ""
    );

    setLastName(
      profile?.last_name ?? ""
    );

    setPhone(
      profile?.phone ?? ""
    );

    setEditing(true);
  }

  function handleCancel() {
    setError(null);

    setFirstName(
      profile?.first_name ?? ""
    );

    setLastName(
      profile?.last_name ?? ""
    );

    setPhone(
      profile?.phone ?? ""
    );

    setEditing(false);
  }

  async function handleSave() {
    if (!user) {
      return;
    }

    setSaving(true);
    setError(null);

    const updatedProfile = {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      phone: phone.trim() || null,
    };

    const { data, error } = await supabase
      .from("profiles")
      .update(updatedProfile)
      .eq("id", user.id)
      .select(
        "first_name, last_name, phone"
      )
      .maybeSingle();

    if (error) {
      console.error(
        "Failed to update profile:",
        error
      );

      setError(
        "We couldn't save your changes. Please try again."
      );

      setSaving(false);

      return;
    }

    setProfile(data);

    setFirstName(
      data?.first_name ?? ""
    );

    setLastName(
      data?.last_name ?? ""
    );

    setPhone(
      data?.phone ?? ""
    );

    setEditing(false);
    setSaving(false);
  }

  return (
    <section
      className="
        border-t
        border-white/10
        pt-12
      "
    >
      {editing ? (
        <div className="space-y-10">

          <ProfileField
            label="First Name"
            value={firstName}
            onChange={setFirstName}
          />

          <ProfileField
            label="Last Name"
            value={lastName}
            onChange={setLastName}
          />

          <ProfileField
            label="Phone"
            value={phone}
            onChange={setPhone}
            type="tel"
          />

          <ProfileRow
            label="Email"
            value={user.email || "—"}
            />

          {error && (
            <p
              className="
                text-sm
                leading-7
                text-white/50
              "
            >
              {error}
            </p>
          )}

          <div className="flex gap-4">
            <CommerceButton
              variant="secondary"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </CommerceButton>

            <CommerceButton
              variant="secondary"
              onClick={handleCancel}
              disabled={saving}
            >
              Cancel
            </CommerceButton>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-10">

            <ProfileRow
              label="Name"
              value={fullName || "—"}
            />

            <ProfileRow
              label="Email"
              value={user.email || "—"}
            />

            <ProfileRow
              label="Phone"
              value={profile?.phone || "—"}
            />

          </div>

          <CommerceButton
            variant="secondary"
            className="mt-16"
            onClick={handleEdit}
          >
            Edit Profile
          </CommerceButton>
        </>
      )}
    </section>
  );
}

interface ProfileFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "tel";
}

function ProfileField({
  label,
  value,
  onChange,
  type = "text",
}: ProfileFieldProps) {
  return (
    <label className="block">
      <span
        className="
          mb-3
          block
          font-mono
          text-[11px]
          uppercase
          tracking-[0.35em]
          text-white/35
        "
      >
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="
          w-full
          border-b
          border-white/20
          bg-transparent
          py-3
          text-lg
          tracking-[-0.02em]
          outline-none
          transition-colors
          focus:border-white/60
        "
      />
    </label>
  );
}

interface ProfileRowProps {
  label: string;
  value: string;
}

function ProfileRow({
  label,
  value,
}: ProfileRowProps) {
  return (
    <div
      className="
        flex
        flex-col
        gap-3

        md:flex-row
        md:items-center
        md:justify-between
      "
    >
      <span
        className="
          font-mono
          text-[11px]
          uppercase
          tracking-[0.35em]
          text-white/35
        "
      >
        {label}
      </span>

      <span
        className="
          text-lg
          tracking-[-0.02em]
        "
      >
        {value}
      </span>
    </div>
  );
}