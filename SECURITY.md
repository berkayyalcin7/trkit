# Security Policy

## Reporting a Vulnerability

Please **do not open a public issue** for security vulnerabilities.
Use GitHub's Private Vulnerability Reporting on this repository
(**Security tab → Report a vulnerability**). You will receive a response
within 72 hours.

## Principles

- Zero runtime dependencies — minimal supply-chain surface
- No network calls, no telemetry, no data collection
- No `eval` or dynamic code execution
- Regexes are avoided in favor of character-level checks; any regex added
  is reviewed against catastrophic backtracking (ReDoS)
- All personal-data-like values in tests (TCKN, IBAN, phone) are
  **synthetically generated** — never real data
- Releases are published via npm Trusted Publishing (OIDC) with provenance;
  every version is cryptographically traceable to its source commit
