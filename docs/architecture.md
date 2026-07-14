# House Eleven Architecture

> Architecture exists to protect the long-term quality of the House.

The goal is not to build the fastest solution.

The goal is to build the simplest solution that can scale gracefully for years.

---

# Philosophy

House Eleven is organised around experiences rather than pages.

Each feature should have a clear responsibility.

The codebase should become easier to understand as it grows.

Complexity should be absorbed by reusable systems rather than repeated across the project.

---

# Core Principles

- Build systems before features.
- Prefer composition over duplication.
- Separate layout from content.
- Separate behaviour from presentation.
- Reuse before creating.
- Refactor only when it creates long-term clarity.

---

# Project Structure

The application is organised into distinct layers.

```text
app/
components/
src/
public/
lib/
docs/
```

Each layer has a single responsibility.

---

# app/

The App Router defines routes.

Responsibilities:

- Routing
- Metadata
- Layout composition
- Server Components where appropriate

Avoid placing business logic here.

---

# components/

Shared UI used throughout the House.

Examples:

- Navigation
- Layout
- Motion
- Typography
- Buttons
- Cursor
- Editorial primitives

These components should remain generic and reusable.

---

# src/

Feature-specific implementation.

Examples:

```text
features/
data/
hooks/
utils/
```

Each feature owns its own components and logic.

---

# lib/

Shared infrastructure.

Examples:

- Motion configuration
- Layer definitions
- Spacing tokens
- Utilities
- Constants

The lib folder should never contain feature-specific code.

---

# public/

Static assets.

Includes:

- Campaign photography
- Product imagery
- Editorial imagery
- Icons
- Videos
- Fonts

Assets should be organised clearly and predictably.

---

# Data Architecture

Content should be driven by structured data whenever practical.

Examples:

- Collections
- Journal entries
- Archive chapters
- Products

Content should not require component rewrites.

---

# Component Philosophy

Every component should have one responsibility.

Questions to ask:

Does this solve a reusable problem?

Will another page need this?

Can it become simpler?

If the answer is no, reconsider abstraction.

---

# Feature Philosophy

Features should be self-contained.

Example:

```text
features/
    archive/
    product/
    journal/
    about/
```

Each feature owns:

- Components
- Logic
- Feature-specific utilities

This keeps the project modular.

---

# Motion Architecture

Motion is centralised.

Avoid inline animation values.

Use shared motion utilities.

Consistency is more important than variety.

---

# Styling

Tailwind is the implementation layer.

Design tokens define the language.

Never duplicate spacing values that already exist in shared tokens.

---

# Performance

Performance is part of the architecture.

Prefer:

- Server Components
- Lazy loading
- Image optimisation
- Shared layouts
- Minimal client-side JavaScript

Every dependency should justify its existence.

---

# Scalability

Future Chapters should require content changes more often than architectural changes.

Adding Chapter 05 should not require restructuring the application.

The architecture should anticipate growth.

---

# Final Principle

Good architecture is invisible.

It allows the House to grow without becoming more complicated.