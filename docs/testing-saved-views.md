# Step 10 — Testing Strategy for Saved Views

This document describes the testing approach used in Step 10 (Hardening phase)
for the Saved Views feature.

## Scope

Tests focus exclusively on **pure logic**, including:

- `slugify` — deterministic slug generation
- `resolveCollision` — safe name collision handling
- `isValidExportV1` — defensive import schema validation

These units are critical for data integrity, persistence, and user trust.

## Explicitly Out of Scope

The following are intentionally not tested:

- UI components
- React hook rendering behavior
- Snapshot tests

Reason:
Saved Views UI is thin orchestration, while business logic lives in pure,
deterministic functions that can be tested in isolation.

This approach maximizes signal-to-noise ratio and avoids brittle tests.
