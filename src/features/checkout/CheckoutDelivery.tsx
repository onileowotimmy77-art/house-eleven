"use client";

import Reveal from "@/components/motion/Reveal";

import {
  Field,
  FieldLabel,
  TextField,
  SelectField,
  FieldHint,
} from "@/components/fields";

import {
  Eyebrow,
  Display,
  Body,
} from "@/components/ui/typography";

export default function CheckoutDelivery() {
  return (
    <section className="py-40">

      <Reveal>

        <Eyebrow>
          Chapter II
        </Eyebrow>

        <Display className="mt-8">
          Delivery
        </Display>

        <Body
          className="
            mt-8
            max-w-2xl
          "
        >
          Every House Eleven piece deserves a precise destination.
        </Body>

      </Reveal>

      <div
        className="
          mt-24
          grid
          gap-x-20
          gap-y-16

          md:grid-cols-2
        "
      >

        <Field className="md:col-span-2">

          <FieldLabel required>
            Street Address
          </FieldLabel>

          <TextField autoComplete="street-address" />

        </Field>

        <Field>

          <FieldLabel required>
            City
          </FieldLabel>

          <TextField autoComplete="address-level2" />

        </Field>

        <Field>

          <FieldLabel required>
            State / Province
          </FieldLabel>

          <TextField autoComplete="address-level1" />

        </Field>

        <Field>

          <FieldLabel required>
            Country
          </FieldLabel>

          <SelectField defaultValue="">
            <option value="" disabled>
              Select Country
            </option>

            <option value="NG">Nigeria</option>
            <option value="GH">Ghana</option>
            <option value="UK">United Kingdom</option>
            <option value="US">United States</option>
          </SelectField>

        </Field>

        <Field>

          <FieldLabel required>
            Postal Code
          </FieldLabel>

          <TextField autoComplete="postal-code" />

        </Field>

        <Field className="md:col-span-2">

          <FieldLabel>
            Delivery Notes
          </FieldLabel>

          <TextField />

          <FieldHint>
            Apartment number, gate code, preferred delivery instructions or anything we should know.
          </FieldHint>

        </Field>

      </div>

    </section>
  );
}