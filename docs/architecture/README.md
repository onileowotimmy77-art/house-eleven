# House Eleven Registry

## Purpose

The Registry is the engineering index for House Eleven.

It documents every reusable system in the project so that new features are built by extending existing architecture instead of creating duplicate components.

The Registry is the first place to check before writing code.

---

## Engineering Principles

1. Reuse existing systems whenever possible.
2. Extend existing systems before creating new ones.
3. Create a new reusable system only when no suitable one already exists.
4. Keep the Registry synchronized with the codebase.

---

## Workflow

Before every implementation:

1. Read the relevant Registry documents.
2. Identify reusable systems.
3. Design the experience.
4. Define the architecture.
5. Implement.
6. Review.
7. Commit.
8. Push.

---

## Source of Truth

The Registry describes the architecture.

The codebase implements the architecture.

If the code changes, the Registry must be updated.