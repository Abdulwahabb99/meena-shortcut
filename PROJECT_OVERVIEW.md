# Meena Health / Meena Intranet

## 1. Project Name

- **Meena Health**
- **Meena Intranet**

---

## 2. Product Overview

Meena Intranet is a unified internal platform designed to enhance employee experience and provide easy access to company information and services.

The primary users are all employees across departments, with tailored support for managers and HR.

---

## 3. Project Objectives

- Enable employees to quickly access key documents and policies
- Enhance communication and collaboration across departments
- Provide a unified access point for internal tools and services
- Increase employee awareness of updates and announcements
- Reduce reliance on fragmented communication channels such as email and WhatsApp

---

## 4. Stakeholders

All Meena departments across the organization, including:

- IT
- HR
- Nursing
- Doctors
- Pharmacy
- Radiology
- Laboratory
- Patient Experience
- Patient Access
- Call Center
- Digital
- HHC

---

## 5. Main Requirements

- Quick and easy access to files and documents
- Efficient internal communication
- Unified information to reduce duplication across systems

---

## 6. User Research

**Sources:**

- Employee interviews
- Surveys

**Current Problems:**

- Difficulty finding documents in SharePoint
- Current UI is complex and not user-friendly
- Dependence on email and WhatsApp for internal communication

**User Needs:**

- Easy and fast access
- Clear information and smooth navigation across departments
- A centralized platform that consolidates all services and key links

---

## 7. Example User Journey

**Scenario:** New employee trying to find the leave policy

- **Steps:** Login → Search for leave policy → Read details → Submit request
- **Emotions:** Frustration when searching, relief when information is found
- **Pain Points:** Difficulty navigating folders, lack of smart search
- **Opportunities:**
  - Advanced search bar
  - Clear document categorization
  - Homepage highlighting frequently used policies

---

## 8. Information Architecture / Site Map

| Section | Description |
|--------|-------------|
| **Home** | Dashboard with quick access to key info and announcements |
| **News & Announcements** | Company news, updates, and announcements |
| **Quick Links** | HIS, Ticketing, Outlook, ERP, and other internal tools |
| **Departments** | IT, HR, Nursing, Doctors, Pharmacy, Radiology, Laboratory, Patient Experience, Patient Access, Call Center, Digital, HHC |
| **Document Hub** | Policies & Procedures, Forms & Templates |
| **Staff Directory** | Names, titles, departments, extensions, locations |
| **Help & Support** | FAQs, contact IT/HR |

---

## 9. Suggested Frontend Structure

```
src/
├── assets/                 # Images, theme, fonts
│   ├── theme/
│   └── images/
├── components/             # Reusable UI components
│   ├── MDBox/
│   ├── MDButton/
│   ├── MDTypography/
│   └── ...
├── constants/              # App constants
├── context/                # React context (layout, theme)
├── examples/               # Layout containers, Sidenav, Navbar
│   ├── LayoutContainers/
│   ├── Sidenav/
│   └── Navbars/
├── icons/
├── layouts/
│   ├── authentication/     # Sign-in, Sign-up
│   │   └── sign-in/
│   ├── Home/               # Home / Dashboard
│   ├── News/               # News & Announcements
│   ├── QuickLinks/         # Quick Links
│   ├── Departments/        # Departments section
│   │   └── DepartmentPage/ # Individual department view
│   ├── DocumentHub/        # Document Hub
│   │   ├── PoliciesProcedures/
│   │   └── FormsTemplates/
│   ├── StaffDirectory/     # Staff Directory
│   └── HelpSupport/        # Help & Support
├── services/
│   ├── api/                # API functions
│   ├── queries/            # React Query hooks (example kept)
│   └── mutations/          # React Query mutations (example kept)
├── locales/                # i18n JSON files (en.json, ar.json)
├── i18n/                   # i18n config (config.js, index.js)
├── shared/
│   ├── component/          # ProtectedRoutes, etc.
│   ├── context/            # AuthContext
│   ├── hooks/              # useTranslate, useLocales, useAuth, etc.
│   └── functions/
├── utils/
├── App.js
├── index.js
├── routes.js               # Main sidebar routes
├── page.routes.js          # Detail / nested routes
└── index.css
```

---

## 10. Routing Plan

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Redirect to `/home` | Default redirect |
| `/sign-in` | SignIn | Authentication |
| `/home` | Home | Dashboard / landing |
| `/news` | News | News & Announcements |
| `/quick-links` | QuickLinks | HIS, Ticketing, Outlook, ERP |
| `/departments` | Departments | Department list |
| `/departments/:slug` | DepartmentPage | Individual department (IT, HR, etc.) |
| `/documents` | DocumentHub | Document Hub landing |
| `/documents/policies` | PoliciesProcedures | Policies & Procedures |
| `/documents/forms` | FormsTemplates | Forms & Templates |
| `/staff` | StaffDirectory | Staff Directory |
| `/help` | HelpSupport | Help & Support (FAQs, contact) |
| `/no-permission` | NoPermission | Access denied page |

---

## Tech Stack

- **React** with Create React App
- **React Router** for routing
- **Material UI (MUI)** for components
- **React Query (TanStack Query)** for data fetching
- **Formik** for forms
- **Axios** for HTTP (with interceptors for auth)
- **react-i18next** for internationalization (i18n)

---

## Internationalization (i18n)

### Supported Languages

| Code | Language | Direction |
|------|----------|-----------|
| `en` | English | LTR |
| `ar` | Arabic | RTL |

### Structure

```
src/
├── locales/                # Translation JSON files (keys aligned)
│   ├── en.json
│   └── ar.json
├── i18n/
│   ├── index.js            # i18next init & config
│   └── config.js           # LOCALES, LOCALE_SETTINGS, STORAGE_KEY
└── shared/hooks/
    ├── useTranslate.js      # t(key) for translations
    └── useLocales.js        # currentLang, isRTL, changeLocale, allLangs
```

### Usage

**Translation keys** – All text uses keys from JSON files. Keys are shared; only values differ per language.

```jsx
import useTranslate from "shared/hooks/useTranslate";

function MyComponent() {
  const { t } = useTranslate();
  return <h1>{t("home.title")}</h1>;
}
```

**Locale & RTL** – Use `useLocales` for current language and direction:

```jsx
import useLocales from "shared/hooks/useLocales";

function MyComponent() {
  const { locale, isRTL, changeLocale, allLangs } = useLocales();
  // isRTL: true when Arabic, false when English
  // changeLocale("ar") or changeLocale("en") to switch
}
```

### Language Switcher

- **Location:** Navbar, next to the settings icon
- **Icon:** `language` (MUI)
- **Behavior:** Dropdown with Arabic / English options
- **Persistence:** Selected locale stored in `localStorage` (`meena-locale`)

### RTL / LTR

- **English:** LTR layout, `document.body.dir="ltr"`
- **Arabic:** RTL layout, `document.body.dir="rtl"`
- MUI theme switches between `theme` / `theme-rtl` and `themeDark` / `themeDarkRtl` based on locale and dark mode.

### Adding New Translations

1. Add the key to both `src/locales/en.json` and `src/locales/ar.json`
2. Use `t("namespace.key")` in components

---

## Getting Started

1. Install dependencies: `npm install`
2. Start dev server: `npm start`
3. Sign in at `/sign-in` (auth flow uses mock/API as configured)

---

## Refactor Summary (Initial Restructure)

### Created Routes

| Route | Component |
|-------|-----------|
| `/home` | Home |
| `/news` | News |
| `/quick-links` | QuickLinks |
| `/departments` | Departments |
| `/departments/:slug` | DepartmentPage |
| `/documents` | DocumentHub |
| `/documents/policies` | PoliciesProcedures |
| `/documents/forms` | FormsTemplates |
| `/staff` | StaffDirectory |
| `/help` | HelpSupport |
| `/sign-in` | SignIn |
| `/sign-up` | SignUp |
| `/no-permission` | NoPermission |

### Removed Routes

- `/dashboard`, `/products`, `/categories`, `/orders`, `/users`, `/roles`, `/permissions`, `/profile`
- `/products/:id`, `/orders/:id`, `/roles/:id`

### Removed Files / Folders

- `layouts/Dashboard/`
- `layouts/Products/`
- `layouts/Categories/`
- `layouts/Orders/`
- `layouts/Users/`
- `layouts/Roles/`
- `layouts/Permissions/`
- `layouts/Profile/`
- `layouts/ecommerce/`
- `layouts/RolesEdit/`
- `layouts/Reports/`
- `layouts/pages/profile/`, `account/`, `charts/`, `rtl/`, `widgets/`, `pricing-page/`, `projects/`, `notifications/`, `users/`
- `services/api/` (orders, products, categories, user, roles, permissions, reports, dashboards)
- `services/queries/` (Orders, products, categories, users, roles, permissions, reports, dashboard)
- `services/mutations/` (users, roles, permissions, products, categories, orders)

### Kept Query Example

- `services/queries/example/useExampleQuery.js`

### Kept Mutation Example

- `services/mutations/useLoginMutation.js` (also used by SignIn)

### Assumptions

- All users see the same sidebar menu (no role-based menu split).
- Default redirect is `/home` instead of `/dashboard`.
- Auth flow and ProtectedRoutes unchanged; login still uses `useLoginMutation`.
- Placeholder pages are minimal; content to be implemented later.
