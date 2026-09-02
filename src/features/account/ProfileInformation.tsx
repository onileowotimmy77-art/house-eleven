"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    let mounted = true;

    async function loadProfile() {
      const { data, error } = await supabase
        .from("profiles")
        .select("first_name, last_name, phone")
        .eq("id", user.id)
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

  return (
    <section
      className="
        border-t
        border-white/10
        pt-12
      "
    >
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
      >
        Edit Profile
      </CommerceButton>
    </section>
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