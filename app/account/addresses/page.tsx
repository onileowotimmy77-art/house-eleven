"use client";

import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import AccountLayout from "@/src/features/account/AccountLayout";
import AddressCard from "@/src/features/account/AddressCard";
import CommerceButton from "@/src/features/commerce/CommerceButton";
import { useAuth } from "@/components/providers/AuthProvider";
import { supabase } from "@/src/lib/supabase/client";

interface Address {
  id: string;
  label: string | null;
  first_name: string;
  last_name: string | null;
  address_line_1: string;
  address_line_2: string | null;
  city: string;
  state: string;
  postal_code: string | null;
  country: string;
  is_default: boolean;
}

interface AddressForm {
  label: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

const initialForm: AddressForm = {
  label: "",
  firstName: "",
  lastName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  isDefault: false,
};

export default function AddressesPage() {
  const { user, loading: authLoading } = useAuth();

  const [addresses, setAddresses] =
    useState<Address[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [adding, setAdding] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [form, setForm] =
    useState<AddressForm>(initialForm);

  async function loadAddresses() {
    if (!user) {
      setAddresses([]);
      setLoading(false);
      return;
    }

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
          postal_code,
          country,
          is_default
        `
      )
      .eq("user_id", user.id)
      .order("is_default", {
        ascending: false,
      })
      .order("created_at", {
        ascending: true,
      });

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

  useEffect(() => {
    if (authLoading) {
      return;
    }

    loadAddresses();
  }, [user, authLoading]);

  function updateField<K extends keyof AddressForm>(
    field: K,
    value: AddressForm[K]
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleAddAddress() {
    setError(null);

    setForm({
      ...initialForm,
      isDefault: addresses.length === 0,
    });

    setAdding(true);
  }

  function handleCancel() {
    if (saving) {
      return;
    }

    setError(null);
    setForm(initialForm);
    setAdding(false);
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!user) {
      return;
    }

    setSaving(true);
    setError(null);

    const { data, error } =
      await supabase.rpc(
        "create_address",
        {
          p_label: form.label,
          p_first_name: form.firstName,
          p_last_name: form.lastName,
          p_address_line_1:
            form.addressLine1,
          p_address_line_2:
            form.addressLine2,
          p_city: form.city,
          p_state: form.state,
          p_postal_code:
            form.postalCode,
          p_country: form.country,
          p_is_default:
            form.isDefault,
        }
      );

    if (error) {
      console.error(
        "Failed to create address:",
        error
      );

      setError(
        "We couldn't save this address. Please check your details and try again."
      );

      setSaving(false);

      return;
    }

    if (data) {
      setAddresses((current) => {
        const nextAddress =
          data as Address;

        if (nextAddress.is_default) {
          return [
            nextAddress,
            ...
            current.map((address) => ({
              ...address,
              is_default: false,
            })),
          ];
        }

        return [
          ...current,
          nextAddress,
        ];
      });
    } else {
      await loadAddresses();
    }

    setForm(initialForm);
    setAdding(false);
    setSaving(false);
  }

  return (
    <AccountLayout
      title="Addresses"
      description="Manage the destinations where your Residence will arrive."
    >
      {authLoading || loading || !user ? null : (
        <div className="space-y-10">

          {!adding && (
            <CommerceButton
              variant="secondary"
              onClick={handleAddAddress}
            >
              Add Address
            </CommerceButton>
          )}

          {adding && (
            <form
              onSubmit={handleSubmit}
              className="
                border-t
                border-white/10
                pt-12
              "
            >
              <div className="space-y-10">

                <AddressField
                  label="Label"
                  value={form.label}
                  onChange={(value) =>
                    updateField(
                      "label",
                      value
                    )
                  }
                />

                <AddressField
                  label="First Name"
                  value={form.firstName}
                  onChange={(value) =>
                    updateField(
                      "firstName",
                      value
                    )
                  }
                  required
                />

                <AddressField
                  label="Last Name"
                  value={form.lastName}
                  onChange={(value) =>
                    updateField(
                      "lastName",
                      value
                    )
                  }
                />

                <AddressField
                  label="Address Line 1"
                  value={form.addressLine1}
                  onChange={(value) =>
                    updateField(
                      "addressLine1",
                      value
                    )
                  }
                  required
                />

                <AddressField
                  label="Address Line 2"
                  value={form.addressLine2}
                  onChange={(value) =>
                    updateField(
                      "addressLine2",
                      value
                    )
                  }
                />

                <AddressField
                  label="City"
                  value={form.city}
                  onChange={(value) =>
                    updateField(
                      "city",
                      value
                    )
                  }
                  required
                />

                <AddressField
                  label="State"
                  value={form.state}
                  onChange={(value) =>
                    updateField(
                      "state",
                      value
                    )
                  }
                  required
                />

                <AddressField
                  label="Postal Code"
                  value={form.postalCode}
                  onChange={(value) =>
                    updateField(
                      "postalCode",
                      value
                    )
                  }
                />

                <AddressField
                  label="Country"
                  value={form.country}
                  onChange={(value) =>
                    updateField(
                      "country",
                      value
                    )
                  }
                  required
                />

                <label
                  className="
                    flex
                    items-center
                    gap-4
                    cursor-pointer
                  "
                >
                  <input
                    type="checkbox"
                    checked={
                      form.isDefault
                    }
                    onChange={(event) =>
                      updateField(
                        "isDefault",
                        event.target.checked
                      )
                    }
                    className="
                      h-4
                      w-4
                    "
                  />

                  <span
                    className="
                      font-mono
                      text-[11px]
                      uppercase
                      tracking-[0.3em]
                      text-white/45
                    "
                  >
                    Set as default address
                  </span>
                </label>

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
                    type="submit"
                    disabled={saving}
                  >
                    {saving
                      ? "Saving..."
                      : "Save Address"}
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
            </form>
          )}

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
                  label={
                    address.label ??
                    ""
                  }
                  recipient={
                    recipient || "—"
                  }
                  address={
                    addressLines || "—"
                  }
                  city={
                    city || "—"
                  }
                  country={
                    address.country ||
                    "—"
                  }
                  isDefault={
                    address.is_default
                  }
                  onEdit={() => {
                    console.log("Edit address:", address.id);
                  }}  
                />
              );
            })}
          </div>

        </div>
      )}
    </AccountLayout>
  );
}

interface AddressFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

function AddressField({
  label,
  value,
  onChange,
  required = false,
}: AddressFieldProps) {
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
        {required && " *"}
      </span>

      <input
        type="text"
        value={value}
        required={required}
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