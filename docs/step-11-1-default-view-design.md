# Step 11.1 — Design: Default View per Domain

> Scope: **design-only**
> No code, no UI, no storage changes yet.

This document defines the **design contract** for how a “default view”
behaves in each domain.

The goal is to make the concept explicit, predictable, and future-proof
before any implementation begins.

---

## 1️⃣ When is the default view applied?

### ✅ Decision

The default view is applied **only in two situations**:

1. **Initial load**

   - When a domain is mounted
   - And the user has not explicitly applied any view yet

2. **Explicit reset**

   - When the user intentionally resets the domain state
   - (future action)

### ❌ Intentionally NOT applied in:

- A simple refresh after a user-applied view
- Importing views
- Saving or deleting views

📌 Design principle:

> The default view is a **fallback**,
> not an override.

---

## 2️⃣ How does the user choose a default view? (conceptual)

### ✅ Decision

Being a default view is a **secondary property**, not a new view type.

Conceptually:

- The user **marks** one existing view as default
- Per domain:

  - At most **one default view**
  - Selecting a new one automatically unsets the previous default

UI is out of scope, but at the contract level we expect:

```ts
setDefaultView(slug);
clearDefaultView();
```

📌 Important note:

> Default ≠ first view
> Default = an explicit user choice

---

## 3️⃣ Where is persistence handled? (storage vs metadata)

### ✅ Final decision

**Metadata is stored separately from snapshots**

Two options were considered:

- ❌ Embed default flag inside `SavedView`
- ✅ Store default info as separate metadata

#### Why separate metadata?

- Snapshots should remain immutable
- “Default” is a behavioral concern, not data
- Keeps import/export clean and predictable

### Conceptual model:

```ts
SavedViewsMap {
  [slug]: { slug, name, snapshot }
}

SavedViewsMeta {
  defaultSlug?: string
}
```

And in storage:

```ts
saved-views:<domain>          // views
saved-views-meta:<domain>     // metadata
```

📌 This separation is critical for long-term scalability.

---

## 4️⃣ Interaction with import / export

### ✅ Conservative (and intentional) decision

#### Export:

- Only **views** are exported
- ❌ Default view is NOT included

#### Import:

- Views are imported
- ❌ No default is set automatically

📌 Rationale:

- “Default” is a **local and contextual decision**
- Imports may come from another project or environment
- Prevents conflicts and surprise behavior

> After import, the user can explicitly choose a default if desired.

---

## 🧠 Design Contract Summary

- Default view:

  - Acts as a fallback
  - Never overrides explicit user actions

- Selection:

  - Explicit and user-driven

- Persistence:

  - Stored as separate metadata

- Import/export:

  - Clean
  - No side effects

---

## ⛔ Explicit Non-Goals

This step intentionally does NOT cover:

- UI design
- Hook API shape
- Storage implementation
- Migrations

These will be addressed in **Step 11.2+**.

---

## 🚀 Next Step

**Step 11.2 — API Design for Default View**

- Public functions
- Return shapes
- Invariants and guarantees
