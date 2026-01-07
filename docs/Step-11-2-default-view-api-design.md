# Step 11.2 — API Design: Default View

> Scope:
> – public hook API
> – invariants
> – no implementation

---

## 🎯 API Goals

The API must allow the application to:

1. Detect whether a default view exists
2. Apply it **only when explicitly intended** (no implicit overrides)
3. Allow the user to set or clear a default view
4. Remain fully decoupled from import/export and view persistence

This step defines **contracts and responsibilities only**.
No storage, UI, or implementation decisions are made here.

---

## 1️⃣ Minimal API Surface

The following APIs are added to `useSavedViews`:

```ts
{
  // existing
  views;
  saveView;
  deleteView;
  applyView;
  exportViews;
  importViews;

  // new
  defaultViewSlug;
  setDefaultView;
  clearDefaultView;
  applyDefaultView;
}
```

The goal is to keep the surface area minimal while enabling full control
from the application layer.

---

## 2️⃣ API Contracts

### `defaultViewSlug: string | null`

- Stores **only the slug** of the default view
- Does not expose the view object or snapshot

**Rationale:**

- Cheap to persist
- Cheap to compare
- Minimizes coupling
- Keeps metadata separate from view data

---

### `setDefaultView(slug: string): void`

**Contract:**

- If the slug does not exist → no-op
- If the slug is already the default → no-op
- If another default exists → overwrite

**Invariant:**

> At most one default view exists per domain

---

### `clearDefaultView(): void`

- Explicitly unsets the default view
- Does not modify saved views
- Affects metadata only

---

### `applyDefaultView(): boolean`

This is the most critical API in this step.

**Behavior:**

- Returns `false` if no default exists
- Returns `false` if the default slug no longer exists
- Applies the snapshot and returns `true` on success

**Why return a boolean?**

- Allows the caller to detect whether a fallback was used
- Enables explicit control during app initialization

---

## 3️⃣ Explicit Non-Goals

This API intentionally does **not**:

- Auto-apply the default view on render
- Apply the default after import
- Automatically assign a default
- Sync with the last applied view

> Control belongs to the application, not the hook.

---

## 4️⃣ Hook Usage — Mental Model

```ts
const { views, applyView, defaultViewSlug, applyDefaultView } = useSavedViews(
  "markets",
  applySnapshot
);

useEffect(() => {
  const applied = applyDefaultView();
  if (!applied) {
    // fallback to empty state or system default
  }
}, []);
```

- The hook does not decide
- The app decides when and how to apply defaults

---

## 5️⃣ Invariants (Hard Rules)

The following invariants must never be violated:

- `defaultViewSlug ∈ views ∪ null`
- `deleteView(defaultViewSlug)` ⇒ default is cleared
- `importViews()` ⇒ default remains untouched
- `exportViews()` ⇒ default is excluded

These rules form the foundation for future tests.

---

## 6️⃣ Deferred Tests (Design Anchors)

Tests are not implemented yet, but the following behaviors
are expected and will be verified later:

- `setDefaultView` ignores invalid slugs
- `applyDefaultView` returns `false` when missing
- Deleting the default clears metadata
- Import does not affect the default

---

## 📦 Step 11.2 Output

- API shape is finalized
- Responsibilities are clearly separated
- Implementation is flexible but constrained
- No feature creep introduced

---

## 🚀 Next Step

**Recommended:**

### Step 11.3 — Storage Design

- key naming
- metadata persistence
- migration strategy
- fail-soft rules

Designing storage first prevents unnecessary refactors during implementation.
