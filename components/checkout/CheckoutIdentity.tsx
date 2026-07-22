"use client";

import Reveal from "@/components/motion/Reveal";

import {
  Field,
  FieldLabel,
  TextField,
  FieldHint,
} from "@/components/fields";

import {
  Eyebrow,
  Display,
  Body,
} from "@/components/ui/typography";

export default function CheckoutIdentity() {
  return (
    <section className="py-40">

      <Reveal>

        <Eyebrow>
          Chapter I
        </Eyebrow>

        <Display className="mt-8">
          Identity
        </Display>

        <Body
          className="
            mt-8
            max-w-2xl
          "
        >
          Before your pieces begin their journey,
          tell us where they belong.
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

        <Field>

          <FieldLabel
            htmlFor="firstName"
            required
          >
            First Name
          </FieldLabel>

          <TextField
            id="firstName"
            autoComplete="given-name"
          />

        </Field>

        <Field>

          <FieldLabel
            htmlFor="lastName"
            required
          >
            Last Name
          </FieldLabel>

          <TextField
            id="lastName"
            autoComplete="family-name"
          />

        </Field>

        <Field className="md:col-span-2">

          <FieldLabel
            htmlFor="email"
            required
          >
            Email
          </FieldLabel>

          <TextField
            id="email"
            type="email"
            autoComplete="email"
          />

          <FieldHint>
            Order updates and receipts will be sent here.
          </FieldHint>

        </Field>

        <Field className="md:col-span-2">

          <FieldLabel
            htmlFor="phone"
          >
            Phone
          </FieldLabel>

          <TextField
            id="phone"
            type="tel"
            autoComplete="tel"
          />

          <FieldHint>
            Used only if we need to contact you about delivery.
          </FieldHint>

        </Field>

      </div>

    </section>
  );
}