# DEVCON Iligan Website

Official website for DEVCON Iligan - the local chapter of Developers Connect (DEVCON), the Philippines' largest volunteer tech community.

## About DEVCON Iligan

DEVCON Iligan serves Iligan City and Lanao del Norte, building a strong, inclusive, and future-ready tech community since 2022. We're part of the national DEVCON network that has been organizing tech unconferences, hackathons, and innovation challenges across the Philippines since 2009.

## Features

- **Responsive Design**: Mobile-first approach with excellent user experience across all devices
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Modern Tech Stack**: Built with React, TypeScript, Tailwind CSS, and Vite
- **Volunteer System**: Integrated volunteer registration and management
- **Contact Integration**: Direct links to Facebook page and iDEYA at MSU-IIT

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite
- **UI Components**: Custom component library with shadcn/ui
- **Backend**: Supabase for data management
- **Deployment**: Ready for modern hosting platforms

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd devcon-iligan-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components
│   ├── About.tsx       # About section
│   ├── Contact.tsx     # Contact section
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section
│   └── Footer.tsx      # Site footer
├── pages/              # Page components
│   ├── Index.tsx       # Home page
│   ├── VolunteerForm.tsx # Volunteer registration
│   └── EventSelection.tsx # Event selection
├── lib/                # Utilities and configurations
├── hooks/              # Custom React hooks
└── index.css          # Global styles and design system
```

## Design System

The website uses a comprehensive design system based on the DEVCON brand:

- **Colors**: Purple (#6600FF), Orange (#EA641D), Yellow (#E6B800), Green (#5BB318)
- **Typography**: Proxima Nova font family
- **Components**: Consistent spacing, shadows, and interactions
- **Responsive**: Mobile-first approach with smooth transitions

## Key Features

### 🎨 Enhanced UI/UX
- Modern, professional design
- Smooth animations and micro-interactions
- Consistent brand identity throughout

### 📱 Mobile Responsive
- Optimized for all screen sizes
- Touch-friendly interface
- Progressive enhancement

### ♿ Accessibility
- WCAG AA compliant
- Screen reader support
- Keyboard navigation
- Proper focus management

### 🚀 Performance
- Optimized build process
- Lazy loading components
- Modern web standards

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Contact

- **Facebook**: [DEVCON Iligan FB Page](https://facebook.com/devconiligan)
- **Visit**: iDEYA at MSU-IIT, Iligan City, Lanao del Norte
- **Email**: hello@devconiligan.com

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

---

**DEVCON Iligan** - Building the future of technology in Northern Mindanao, one connection at a time.