# Security Policy

Thank you for helping keep this project and its users safe.

## Reporting a Vulnerability
- Please do not open public issues for security vulnerabilities.
- Email: security@alaulia.ac.id (or info@alaulia.ac.id) with a clear description, reproduction steps, impact, and affected files.
- If email is not available, use a private GitHub Security Advisory (if enabled) or contact the repository owner directly.
- We aim to acknowledge reports within 72 hours.

## Scope
- Static site sources in this repository (`*.html`, `assets/**`, `foto/**`).
- Build/deployment pipeline configurations (if present).

## Disclosure Policy
- We follow responsible disclosure: please allow time for remediation before any public disclosure.
- Coordinated disclosure timelines will be agreed on a case‑by‑case basis based on severity and complexity.

## Security Best Practices (Project)
- Avoid committing secrets or private media. Use `.gitignore` patterns provided.
- Prefer HTTPS, use Subresource Integrity (SRI) for third‑party CDNs or self‑host assets.
- Apply strong Content Security Policy and related headers at hosting.

## Supported Versions
This is a static site; all commits in `main` are supported. If versioning is introduced later, security support will cover the latest release and the previous one.