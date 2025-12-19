# CodeArena - Competitive Programming Platform

A modern, clean, developer-focused web application UI for a competitive programming platform inspired by CodeChef, LeetCode, GitHub, and VS Code.

## Features

### Design System
- **Dark theme by default** with light theme support via theme toggle
- **Consistent color palette** for easy/medium/hard difficulty badges
- **Reusable components**: Button, Input, Card, Badge, Tabs, Select, CodeEditor
- **Professional typography** with good spacing and clean layout
- **Desktop-first design** optimized for 1440px width

### Pages

1. **Landing Page** - Welcome page with platform features and statistics
2. **Authentication**
   - Login page
   - Register page
3. **Problems List** - Browse and filter problems with search, difficulty, and tags
4. **Problem Detail** - Split-screen layout with:
   - Problem description with tabs (Problem/Solutions/Discussions)
   - Code editor with language selector
   - Run and Submit buttons
   - Output panel with test results
5. **Submission Detail** - View submission results with test case breakdown
6. **User Profile** - User stats, progress tracking, and submission history
7. **Leaderboard** - Global and weekly rankings
8. **Admin Dashboard** - Platform statistics and problem management

### Navigation

- **Landing Page**: Click "Get Started" or "Sign Up" to register
- **Login/Register**: Create an account or sign in
- **Main Navigation**: Problems, Leaderboard, Admin (when authenticated)
- **User Menu**: Profile and Logout options
- **Theme Toggle**: Available on all pages

## Color Scheme

- **Primary**: Blue (#3b82f6 in dark mode)
- **Success**: Green (#10b981)
- **Warning**: Orange/Amber (#f59e0b)
- **Destructive**: Red (#dc2626)
- **Easy**: Green
- **Medium**: Orange
- **Hard**: Red

## Components

All components are located in `/src/app/components/`:
- `Button.tsx` - Primary, secondary, outline, ghost, and destructive variants
- `Input.tsx` - Form input with label and error support
- `Card.tsx` - Container component with header and content sections
- `Badge.tsx` - Status and difficulty indicators
- `Tabs.tsx` - Tab navigation component
- `Select.tsx` - Dropdown selector
- `CodeEditor.tsx` - Code editing component
- `Navbar.tsx` - Main navigation bar
- `ThemeToggle.tsx` - Dark/light theme switcher

## Mock Data

The application uses mock data to demonstrate functionality:
- 10 sample problems with various difficulties
- User statistics and submission history
- Leaderboard rankings
- Test cases and verdicts

## Development

The app is a single-page application with client-side routing. Navigation is handled through link clicks that update the current page state.
