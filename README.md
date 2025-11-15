# Labely - Data Labeling Platform

A modern, clean web frontend for Labely - the fastest way to get high-quality labeled data. Built for organizations and startups that need data labeled quickly and accurately.

## Features

### Marketing & Authentication
- **Marketing Home Page**: Hero section with clear value proposition, "How It Works" guide, key benefits, and trust-building sections
- **Authentication**: Simple sign up/sign in flows with company information

### Organization Dashboard
- **Project Overview**: View all projects with status, progress, spend, and quality metrics
- **Global Stats**: Total items labeled, total spend, and average turnaround time

### Project Management
- **Multi-Step Project Creation Wizard**:
  1. Project basics (name, description, use case)
  2. Task type selection and label class definition
  3. Data upload with drag-and-drop
  4. Budget and pricing configuration
  5. Quality settings (labels per item, min ELO, gold-check frequency)
  6. Review and launch

- **Project Detail View**:
  - Real-time progress tracking
  - Quality metrics and confidence scores
  - Activity log with timeline
  - Budget top-up functionality
  - Download labeled data

### Billing & Team
- **Billing**: View invoices, spending history, and payment methods
- **Team Management**: Invite members, manage roles (Owner, Editor, Viewer)

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling with dark mode and purple-pink gradient theme
- **React Router** for navigation
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Labely-web
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Layout.tsx
│   ├── Navigation.tsx
│   └── Select.tsx
├── pages/            # Page components
│   ├── HomePage.tsx
│   ├── SignInPage.tsx
│   ├── SignUpPage.tsx
│   ├── DashboardPage.tsx
│   ├── ProjectCreatePage.tsx
│   ├── ProjectDetailPage.tsx
│   └── BillingTeamPage.tsx
├── App.tsx           # Main app component with routes
├── main.tsx          # App entry point
└── index.css         # Global styles and Tailwind
```

## Design Theme

- **Dark Mode**: Primary background with purple to pink gradients
- **Modern B2B**: Clean, professional interface targeted at teams and organizations
- **Accessibility**: Clear typography, good contrast ratios, and intuitive navigation

## Key Routes

- `/` - Marketing home page
- `/signin` - Sign in page
- `/signup` - Sign up page
- `/dashboard` - Organization dashboard (authenticated)
- `/projects/create` - Project creation wizard (authenticated)
- `/projects/:id` - Project detail view (authenticated)
- `/billing-team` - Billing and team management (authenticated)

## Notes

- This is a frontend-only implementation with mock data
- Authentication is simulated (redirects without validation)
- File uploads, downloads, and API calls are mocked
- All data is static and stored in component state

## License

See LICENSE file for details.
