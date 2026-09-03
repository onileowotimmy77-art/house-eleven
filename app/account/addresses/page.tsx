"use client";

import { useEffect, useState } from "react";

import AccountLayout from "@/src/features/account/AccountLayout";
import AddressCard from "@/src/features/account/AddressCard";
import { useAuth } from "@/components/providers/AuthProvider";
import { supabase } from "@/src/lib/supabase/client";

interface Address {
  id: string;
  label: string;
  first_name: string;
  last_name: string;
  address_line_1: string;
  address_line_2: string | null;
  city: string;
  state: string | null;
  country: string;
  is_default: boolean;
}

export default function AddressesPage() {
  const { user, loading: authLoading } = useAuth();

  const [addresses, setAddresses] =
    useState<Address[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      setAddresses([]);
      setLoading(false);
      return;
    }

    const currentUser = user;

    let mounted = true;

    async function loadAddresses() {
      const { data, error } = await supabase
        .from("addresses")
        .select(
          `
            id,
            label,
            first_name,
            last_name,
            address_line_1,
            address_line_2,
            city,
            state,
            country,
            is_default
          `
        )
        .eq("user_id", currentUser.id)
        .order("is_default", {
          ascending: false,
        })
        .order("created_at", {
          ascending: true,
        });

      if (!mounted) {
        return;
      }

      if (error) {
        console.error(
          "Failed to load addresses:",
          error
        );

        setAddresses([]);
      } else {
        setAddresses(data ?? []);
      }

      setLoading(false);
    }

    loadAddresses();

    return () => {
      mounted = false;
    };
  }, [user, authLoading]);

  return (
    <AccountLayout
      title="Addresses"
      description="Manage the destinations where your Residence will arrive."
    >
      {authLoading || loading  !user ? null : (
        <div className="space-y-8">
          {addresses.map((address) => {
            const recipient = [
              address.first_name,
              address.last_name,
            ]
              .filter(Boolean)
              .join(" ");

            const addressLines = [
              address.address_line_1,
              address.address_line_2,
            ]
              .filter(Boolean)
              .join(", ");

            const city = [
              address.city,
              address.state,
            ]
              .filter(Boolean)
              .join(", ");

            return (
              <AddressCard
                key={address.id}
                label={address.label}
                recipient={recipient || "—"}
                address={addressLines || "—"}
                city={city || "—"}
                country={address.country || "—"}
                isDefault={address.is_default}
              />
            );
          })}
        </div>
      )}
    </AccountLayout>
  );
}