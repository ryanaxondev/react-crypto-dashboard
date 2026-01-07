# 🧠 Step 11.3 — Storage Design: Default View

📌 **Goal of this Step**
Define the exact storage location, schema, and behavioral rules for persisting the Default View.

> Scope: **design-only**
> No implementation, no refactors, no UI changes.

---

## 1️⃣ What Is Stored? (Data Model)

Only **one new piece of data** is introduced:

```ts
defaultViewSlug?: string
```

Characteristics:

- Optional
- Stores only a **slug reference**
- Must point to an existing saved view
- Never stores or duplicates snapshots

📌 Core principle:

> Default View = reference
> Not a copy
> Not a snapshot

---

## 2️⃣ Where Is It Stored? (Location)

### ❌ Inside the Saved View itself

Rejected because:

- Only one view can be default
- Delete / rename logic becomes error-prone
- Import / export complexity increases

---

### ❌ In hook state only

Rejected because:

- No persistence across refresh
- Breaks user expectations

---

### ✅ Separate per-domain metadata storage

📌 Final decision:

```txt
saved-views-meta:{domain}
```

This ensures:

- Clear separation of concerns
- Independent evolution from views
- Domain isolation

---

## 3️⃣ Final Metadata Schema

```ts
type SavedViewsMetaV1 = {
  version: 1;
  defaultViewSlug?: string;
};
```

Why this schema:

- Explicitly versioned (future-proof)
- Minimal surface area
- Decoupled from view snapshots

---

## 4️⃣ Versioning & Fail-Soft Rules

| Scenario                | Behavior           |
| ----------------------- | ------------------ |
| Missing version         | Ignore metadata    |
| Version ≠ 1             | Ignore metadata    |
| Malformed payload       | Ignore metadata    |
| Slug not found in views | Treat as undefined |

📌 **No throws. No crashes. No corruption.**

The system always fails softly.

---

## 5️⃣ Interaction with Delete

If:

```ts
deleteView(slug);
```

and:

```ts
slug === defaultViewSlug;
```

Then:

```ts
defaultViewSlug = undefined;
```

Behavior:

- Silent reset
- No reassignment
- No side effects

📌 Default is never auto-migrated.

---

## 6️⃣ Interaction with Import / Export

### Export

In the 11.x series:

- Metadata is **not exported**
- Backward compatibility is preserved

📌 Export remains **views-only**.

---

### Import

When views are imported:

- Views are merged
- Metadata remains untouched

📌 Default selection is always an **explicit user decision**.

---

## 7️⃣ Cross-Domain Isolation

- Metadata is strictly per-domain
- Switching domains loads independent metadata
- No shared or leaked state

---

## 8️⃣ Forward Migration Path (Future)

The versioned schema allows future extensions such as:

- Multiple defaults
- Per-user preferences
- Auto-restore strategies

📌 Versioning is intentional groundwork.

---

## 9️⃣ Explicit Non-Goals

This design deliberately avoids:

- Auto-assigning defaults
- Heuristic-based decisions
- Fallback logic
- Import inference
- Implicit or magical behavior

---

## ✅ Summary of Decisions

| Area          | Decision                    |
| ------------- | --------------------------- |
| Storage key   | `saved-views-meta:{domain}` |
| Schema        | `SavedViewsMetaV1`          |
| Behavior      | Fail-soft                   |
| Delete action | Clears default              |
| Import/Export | Metadata ignored            |
| Versioning    | Yes                         |

---

## 🔜 Next Step

### 👉 Step 12 — Implementation

In Step 12 we will:

- Extend `useSavedViews` with a metadata layer
- Add storage helpers for metadata
- Implement the designed API contracts
- Add focused tests for pure logic
- Ship clean, scoped commits
