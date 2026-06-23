# ScandexPRO UI Kit

## Overview
High-fidelity interactive prototype of the ScandexPRO™ GED application. Covers the five main authenticated screens plus the login screen.

## Screens
| Screen | Route | Description |
|---|---|---|
| Login | `/login` | Split-panel login with Hospital do Olho logo |
| Dashboard | `/dashboard` | Patient record search + surgery list + document viewer |
| Communication | `/communication` | Internal task/message inbox |
| Users | `/users` | User management table (SuperAdmin only) |
| Reports | `/reports` | Stats overview + document volume chart |
| Admin | `/admin` | Admin area — permissions, printers, barcodes, logs |

## Files
- `index.html` — Full interactive prototype (React/Babel)
- `Components.jsx` — Shared primitives: `SDXButton`, `SDXInput`, `SDXCard`, `SDXRoleBadge`, `SDXBadge`, `SDXStatusDot`, `SDXAvatar`, `SDXToast`

## Usage
Open `index.html` directly in a browser. Login with any username/password. Try searching prontuário **9999999** or **100111** on the dashboard.

## Design Width
1200px desktop. Responsive to narrower widths but optimized for desktop-first.
