# 🚀 React Crypto Dashboard

A **production-grade crypto dashboard** built with modern React architecture, focusing on **infrastructure-first design**, **domain isolation**, and **persistent UI state**.

This project is not just a UI showcase — it is an **architectural blueprint** for building scalable, testable, and maintainable front-end systems.

---

## ✨ Key Features

### 📊 Crypto Dashboard

* Market data visualization
* Advanced filtering & sorting
* Configurable layouts
* Domain-isolated feature modules

---

### 💾 Saved Views Engine (Core Infrastructure)

A fully **versioned**, **domain-safe**, and **persistent** Saved Views system implemented as a reusable custom hook.

**Capabilities:**

* Save arbitrary UI snapshots
* Slug-based collision handling
* Domain isolation (`home`, `chart`, ...)
* LocalStorage persistence
* Versioned export / import (v1)
* Defensive schema validation
* Default view system (metadata-based)
* Fail-soft architecture

> Saved Views is treated as a **product-grade state engine**, not a UI convenience.

---

## 🧠 Architecture Philosophy

This project follows an **infrastructure-first design philosophy**.

Instead of starting from UI, we begin by designing:

* Storage contracts
* Versioned schemas
* Stable APIs
* Invariants
* Defensive boundaries

**Core principle:**

> Behavior is added only after infrastructure is stable.

This ensures:

* Predictable runtime behavior
* Long-term maintainability
* Safe extensibility
* Clean separation of concerns

---

## 🏗 High-Level Architecture

```
┌──────────────┐
│     UI       │
│ Components   │
└──────┬───────┘
       ↓
┌──────────────┐
│  Feature     │
│ Modules      │
└──────┬───────┘
       ↓
┌──────────────┐
│  Custom      │
│  Hooks       │  ← Core business logic lives here
└──────┬───────┘
       ↓
┌──────────────┐
│ Storage +    │
│ Persistence  │  ← Versioned, guarded, domain-safe
└──────────────┘
```

**Rule:**
UI never directly touches persistence.

---

## 🔐 Saved Views Engine — API Overview

```ts
const {
  views,
  saveView,
  deleteView,
  applyView,

  exportViews,
  importViews,

  defaultViewSlug,
  setDefaultView,
  clearDefaultView,
  applyDefaultView,
} = useSavedViews(domain, applySnapshot)
```

### Design Highlights

* Domain-scoped storage keys
* Versioned export schema (`version: 1`)
* Defensive import guards
* Structured cloning to prevent mutation leaks
* Separate metadata layer for default view
* Automatic default cleanup on deletion
* Fail-soft behavior (no throws, no crashes)

---

## 📦 Export Format (v1)

```ts
{
  version: 1,
  domain: string,
  exportedAt: string,
  views: Array<{
    slug: string,
    name: string,
    snapshot: T
  }>
}
```

**Design goals:**

* Forward compatibility
* Stable public API
* Zero coupling to internal storage

---

## 📂 Project Structure

```
src/
│
├── App.tsx
├── main.tsx
├── index.css
│
├── pages/                # Route-level pages
│   ├── Home.tsx
│   ├── Coin.tsx
│   ├── About.tsx
│   ├── NotFound.tsx
│   │
│   └── home/
│       └── homePresets.ts
│
├── components/
│   │
│   ├── Layout.tsx
│   ├── ErrorBoundary.tsx
│   ├── AsyncState.tsx
│   ├── Loader.tsx
│   │
│   ├── CoinCard.tsx
│   ├── LimitSelector.tsx
│   ├── FilterInput.tsx
│   ├── SortSelector.tsx
│   │
│   ├── skeletons/
│   │
│   ├── coin/
│   │
│   ├── coin-chart/
│   │
│   └── saved-views/
│
├── hooks/                # Business logic & state engines
│   ├── useCoins.ts
│   ├── useCoin.ts
│   ├── useCoinChart.ts
│   ├── useSavedViews.ts
│   ├── useSavedViews.test.ts
│   ├── useHomeSearchParams.ts
│   ├── useChartSearchParams.ts
│   └── useDebouncedValue.ts
│
├── services/             # API access & data mapping
│   ├── cryptoApi.ts
│   ├── coinMapper.ts
│   └── chartMapper.ts
│
├── types/                # Domain models
│   ├── coin.ts
│   ├── coin-details.ts
│   ├── coin-chart.ts
│   └── home.ts
│
└── lib/                  # Pure utilities
    ├── coinList.utils.ts
    └── chart.ts
```

---

## 🧪 Testing Strategy

Testing focuses exclusively on **pure logic**:

* Slug generation
* Collision resolution
* Export schema validation
* Import guards

UI and hooks orchestration are intentionally **excluded** to:

* Avoid brittle tests
* Maximize signal-to-noise ratio
* Keep architecture testable

---

## 🛠 Tech Stack

* React
* TypeScript
* Vite
* LocalStorage API
* Vitest (unit testing)
* Modern Hooks-based architecture

---

## 🚀 Development

```bash
git clone https://github.com/ryanaxondev/react-crypto-dashboard.git
cd react-crypto-dashboard
npm install
npm run dev
```

---

## 🎯 Project Goals

This repository serves as:

* A **front-end architecture reference**
* A **Saved Views engine blueprint**
* A demonstration of **domain-driven UI state design**
* A real-world example of **versioned client-side persistence**

---

## 📈 Roadmap

* [x] Domain-isolated Saved Views
* [x] Versioned export / import
* [x] Default view metadata layer
* [x] Unit testing of pure logic
* [ ] Auto-apply default view on mount
* [ ] UI indicators for default state
* [ ] Remote sync layer (future)
* [ ] Cross-device persistence

---

## 🤝 Contributing

Contributions, ideas, architectural discussions, and critiques are welcome.

Open an issue or submit a PR.

---

## 📜 License

MIT

---

## 🧠 Design Note

This project intentionally prioritizes:

> **Correctness → Predictability → Extensibility → UI polish**

over rapid feature shipping.

---

## 🎓 Why This Repo Is Different

Most dashboards showcase UI.

This one showcases **architectural thinking**.
