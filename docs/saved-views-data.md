# 📦 Saved Views — Export & Import (v1)

---

## Context

Following the UX-focused refinements in **Step 8.4**, the Saved Views system
entered a new phase focused on **data ownership, stability, and portability**.

Step **9** introduces a **formal export/import contract** for Saved Views.
This is not a UI feature, but a **product-level data API** designed to be:

- explicit
- versioned
- domain-safe
- defensive by default

The goal is to treat Saved Views as **first-class user data**, not as an
implementation detail tied to storage or UI state.

---

## 🎯 Design Goals

The Saved Views export/import system is intentionally designed to:

- Be **data-first**, not UI-driven
- Be **pure and side-effect free** (except explicit import)
- Be **versioned** to allow schema evolution
- Preserve **domain boundaries** (`home` vs `chart`)
- Fail safely without throwing
- Enable **secure re-import** in future versions

> Exported data represents an **official snapshot of user-defined views**,
> suitable for backup, transfer, or future compatibility — not a debugging artifact.

---

## 🥇 Step 9.1 — Export Saved Views

### Purpose

The export step establishes a **stable, explicit snapshot format** for
Saved Views that can be relied upon long-term.

Export is treated as a **pure capability**:
it observes state but never mutates it.

---

### 🧾 Export Schema (v1)

```ts
export type ExportedSavedViewsV1<T> = {
  version: 1;
  domain: "home" | "chart";
  exportedAt: string; // ISO timestamp
  views: Array<{
    slug: string;
    name: string;
    snapshot: T;
  }>;
};
```

---

### Field Guarantees

| Field        | Description                                         |
| ------------ | --------------------------------------------------- |
| `version`    | Explicit numeric schema version                     |
| `domain`     | Domain ownership of the exported views              |
| `exportedAt` | Metadata only (no logic dependency)                 |
| `views`      | User-defined saved views (data-only representation) |

---

### 📤 Export Behavior

The `exportViews()` API guarantees that it:

- Returns a **pure, immutable snapshot**
- Does **not** mutate localStorage or internal state
- Does **not** perform validation (data is trusted)
- Never throws
- Always returns a structurally valid export object

Empty exports are considered valid and intentional.

📌 **Design note:**
Validation and recovery are explicitly deferred to the import phase.

---

## 🥈 Step 9.2 — Import Saved Views

### Purpose

Import is where **defensive programming** is enforced.

Unlike export, import deals with **untrusted input** and must protect
existing user data from corruption, overwrites, or crashes.

---

### 📥 Import Behavior

The `importViews(data)` API follows a **fail-soft strategy**:

- Invalid input never throws
- Unsafe data is ignored, not corrected
- Existing views are preserved at all times

---

### Validation Rules

Import proceeds only if all high-level guards pass:

- `version === 1`
- `export.domain` matches the current domain
- `views` is an array

For individual views:

- `name` must be a non-empty string
- `snapshot` is treated as **opaque domain-owned data**
- Invalid entries are skipped, not rejected globally

Any validation failure results in a **silent no-op**.

---

### Merge Strategy

Imported views are **merged**, never replaced.

- Existing views are **never deleted**
- Slug collisions are resolved deterministically
- Partial imports are allowed and expected
- Storage is written only after the merge completes

This ensures import is always safe, predictable, and user-respecting.

---

## 🧪 Behavior Matrix

| Scenario            | Result               |
| ------------------- | -------------------- |
| Version mismatch    | Ignored              |
| Domain mismatch     | Ignored              |
| Invalid view entry  | Skipped              |
| Slug collision      | Auto-increment       |
| Empty import        | No-op                |
| Partially valid set | Valid views imported |

---

## 🔒 API Stability

With the introduction of export/import support (v1), the public API of
`useSavedViews` is considered **stable**.

Breaking changes require an explicit version bump and migration strategy.

This stability is intentional and documented to support:

- future tests
- long-term maintenance
- confident product extension

---

## 🧭 Non-Goals (Deliberate Exclusions)

The export/import system intentionally does **not**:

- Validate snapshot contents
- Handle UI or file I/O concerns
- Perform automatic migrations
- Replace or delete existing user data
- Implicitly modify application state

📌 **Goal:** safety, predictability, and forward compatibility — not convenience shortcuts.

---

## 🏁 Final Assessment

Step 9 elevates Saved Views from a local persistence feature to a
**formal, versioned product API**.

The system is now:

- domain-aware
- defensive by design
- safe to extend
- suitable for long-term use and review

This establishes a solid foundation for testing, future schema evolution,
and product-grade reliability.
