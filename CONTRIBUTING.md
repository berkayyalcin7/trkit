# Contributing

Thanks for your interest! trkit is a free, non-profit, open-source project.

## Ground Rules

1. **Never commit real personal data.** All TCKN/IBAN/phone values in code and
   tests must be synthetic (algorithmically valid but fabricated).
2. **Pure functions only**: no side effects, no network calls, no hidden
   `Date.now()` inside logic.
3. **Zero runtime dependencies** — PRs adding a dependency will be declined.
4. Prefer character-level checks over regex; any regex must be ReDoS-safe.

## Workflow

1. Fork the repo and create a branch: `feat/...`, `fix/...`, `docs/...`, `chore/...`
2. Write code **and tests** — coverage must stay at 100%
3. Run `npm run verify` locally (lint + typecheck + tests + build + package checks)
4. Add a changeset: `npx changeset` (choose patch/minor/major and write a summary)
5. Open a PR with a Conventional Commits title (`feat: add isValidVKN`)

Every public function needs a short JSDoc with rules and one `@example`.
