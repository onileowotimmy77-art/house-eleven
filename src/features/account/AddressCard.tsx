"use client";

import { useState } from "react";

interface AddressCardProps {
  label: string;
  recipient: string;
  address: string;
  city: string;
  country: string;
  isDefault?: boolean;
onEdit?: () => void;
onDelete?: () => void;
}

export default function AddressCard({
  label,
  recipient,
  address,
  city,
  country,
  isDefault = false,
  onEdit,
  onDelete,
}: AddressCardProps) {

  const [confirmingDelete, setConfirmingDelete] = 
    useState(false);

  return (
    <article
      className="
        border
        border-white/10
        p-10
        transition-colors
        duration-300
        hover:border-white/20
      "
    >
      <div className="flex items-start justify-between gap-6">

        <div>

        {label && (
          <p
            className="
              font-mono
              text-[11px]
              uppercase
              tracking-[0.35em]
              text-white/35
            "
          >
            {label}
          </p>
        )}
          <h2
            className="
              mt-5
              text-[1.35rem]
              font-medium
              tracking-[-0.03em]
            "
          >
            {recipient}
          </h2>

        </div>

        {isDefault && (
          <span
            className="
              font-mono
              text-[10px]
              uppercase
              tracking-[0.35em]
              text-white/45
            "
          >
            Default
          </span>
        )}

      </div>

      <p
        className="
          mt-8
          leading-8
          text-white/60
        "
      >
        {address}
        <br />
        {city}
        <br />
        {country}
      </p>

    <div className="mt-8 flex items-end justify-between gap-6">
  {onEdit && (
    <button
      type="button"
      onClick={onEdit}
      className="
        font-mono
        text-[10px]
        uppercase
        tracking-[0.35em]
        text-white/40
        transition-colors
        duration-300
        hover:text-white
      "
    >
      Edit Address
    </button>
  )}

  {onDelete && !confirmingDelete && (
    <button
      type="button"
      onClick={() =>
        setConfirmingDelete(true)
      }
      className="
        font-mono
        text-[10px]
        uppercase
        tracking-[0.35em]
        text-white/20
        transition-colors
        duration-300
        hover:text-white/50
      "
    >
      Delete
    </button>
  )}

  {confirmingDelete && (
    <div className="ml-auto text-right">
      <p
        className="
          font-mono
          text-[10px]
          uppercase
          tracking-[0.25em]
          text-white/40
        "
      >
        Remove this address?
      </p>

      <div className="mt-4 flex justify-end gap-6">
        <button
          type="button"
          onClick={() => {
            onDelete?.();
            setConfirmingDelete(false);
          }}
          className="
            font-mono
            text-[10px]
            uppercase
            tracking-[0.35em]
            text-white/60
            transition-colors
            duration-300
            hover:text-white
          "
        >
          Confirm
        </button>

        <button
          type="button"
          onClick={() =>
            setConfirmingDelete(false)
          }
          className="
            font-mono
            text-[10px]
            uppercase
            tracking-[0.35em]
            text-white/25
            transition-colors
            duration-300
            hover:text-white/60
          "
        >
          Cancel
        </button>
      </div>
    </div>
  )}
</div>
    </article>
  );
}