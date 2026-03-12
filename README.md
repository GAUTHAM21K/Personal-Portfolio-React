# 🚀 Gautham's Portfolio

A modern, interactive personal portfolio website showcasing my work as a Flutter developer and tech enthusiast. Features a **dual-theme design** with a developer (terminal) mode and an artist (creative) mode, combined with smooth animations and 3D graphics.

## ✨ Features

### 🎨 Dual Theme System

- **Developer Mode**: Terminal-inspired interface with matrix-style aesthetics and system-like interactions
- **Artist Mode**: Creative, visually stunning interface with smooth gradients and artistic elements
- Seamless transitions between themes with smooth animations

### 🔧 Interactive Components

- **Hero Section**: 3D Spline graphics with parallax scrolling and typewriter text effects
- **Skills Showcase**: Professional skill progression display with animated bars
- **Projects Portfolio**: Featured projects and work experience with filterable archive
- **Contact Form**: Direct email integration using EmailJS
- **Live System Uptime**: Developer theme includes a live uptime counter
- **Responsive Design**: Fully mobile-optimized with adaptive layouts

### 🎬 Advanced Animations

- Framer Motion for smooth page transitions and element animations
- Lottie animations for engaging visual effects
- Typewriter effects for dynamic text display
- Canvas confetti for interactive celebrations
- Parallax scrolling effects

### 📱 Responsive & Accessible

- Mobile-first design approach
- Fully responsive from mobile to desktop
- Smooth theme transitions with CSS-in-JS
- Accessible navigation and interactive elements

## 🛠️ Tech Stack

### Frontend

- **React** 19.2 - Modern UI library
- **Vite** 7.3 - Lightning-fast build tool
- **Tailwind CSS** 4.2 - Utility-first CSS framework
- **JavaScript**

### Animations & 3D

- **Framer Motion** 12.35 - Advanced animations
- **Three.js** 0.183 - 3D graphics
- **React Three Fiber** 9.5 & **Drei** 10.7 - React Three.js helpers
- **Spline** 4.1 - 3D design integration
- **Lottie React** 2.4 - Animation library
- **Canvas Confetti** 1.9 - Particle effects

### Utilities

- **EmailJS** - Email service integration
- **Lucide React** - Icon library
- **Tailwind Merge** - CSS class utility
- **CLSX** - Conditional class names

### Development

- **ESLint** 9.39 - Code quality
- **@vitejs/plugin-react** 5.1 - React fast refresh

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/gauth/gautham-portfolio.git
   cd gautham-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables** (if needed for EmailJS)
   - Update the Service ID, Template ID, and Public Key in `Contact.jsx`

4. **Start development server**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173`

## 📦 Build & Deployment

### Build for Production

```bash
npm run build
```

Creates an optimized production build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

### Lint Code

```bash
npm run lint
```

## 📄 Project Structure

```
gautham-portfolio/
├── src/
│   ├── components/
│   │   ├── Hero.jsx              # Hero section with 3D Spline graphics
│   │   ├── Navbar.jsx            # Navigation with theme toggle
│   │   ├── Skils.jsx             # Skills section
│   │   ├── Projects.jsx          # Projects & work experience
│   │   ├── Contact.jsx           # Contact form with EmailJS
│   │   ├── Footer.jsx            # Footer with social links
│   │   ├── ThemeToggle.jsx       # Theme switcher component
│   │   ├── Works.jsx             # Works/portfolio section
│   │   ├── Gallery.jsx           # Gallery component
│   │   └── Game.jsx              # Interactive game component
│   ├── assets/                   # Images and static assets
│   ├── App.jsx                   # Main App component
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Global styles
├── public/                       # Static files
│   ├── art_animation.lottie     # Art theme animation
│   ├── dev_animation.lottie     # Dev theme animation
│   └── art/                      # Art assets
├── vite.config.js               # Vite configuration
├── package.json                 # Dependencies & scripts
├── eslint.config.js             # ESLint configuration
└── README.md                     # This file

```

## 🎯 Key Sections

### 1. Hero Section

Introduces the portfolio with a 3D Spline scene, dynamic typewriter effect, and context-aware backgrounds that change based on the selected theme.

### 2. Skills Section

Displays technical proficiencies including:

- Flutter (80%)
- Python (75%)
- React/Node.js (75%)
- Git & Version Control (85%)

### 3. Projects & Experience

Showcases:

- **Current Role**: Flutter Developer Intern at Nexotech Solutions (2025-2026)
- **Featured Projects**:
  - QGuard: Secure messaging with post-quantum cryptography
  - AI Gym Tracker: Workout tracking with AI coaching
  - Real-time Project Management Website
- **Project Archive**: Additional projects with filtering

### 4. Contact

Direct messaging form integrated with EmailJS for seamless communication.

### 5. Footer

Social media links and live system uptime (dev mode only).

## 🎨 Customization

### Change Your Information

1. Update project details in `src/components/Projects.jsx`
2. Modify skills in `src/components/Skils.jsx`
3. Add social links in `src/components/Footer.jsx`
4. Update contact information in `src/components/Contact.jsx`

### Update 3D Graphics

- Replace Spline scene in `src/components/Hero.jsx` with your own Spline ID
- Customize animations in component files using Framer Motion

### Modify Color Scheme

- Update Tailwind CSS classes in components
- Check `src/index.css` for global theme variables

## 📞 Contact & Social

- **GitHub**: [@gauth](https://github.com/gauth)
- **LinkedIn**: [Gautham Krishna]
- **Email**: Reach out through the contact form

## 📝 License

This project is open-source and available under the MIT License. Feel free to fork, modify, and use it as inspiration for your own portfolio!

## 🙏 Acknowledgments

- [Spline](https://spline.design) - 3D design tool
- [Framer Motion](https://www.framer.com/motion) - Animation library
- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [Vite](https://vitejs.dev) - Build tool
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) - React 3D library

## 📈 Future Enhancements

- [ ] Blog section with markdown support
- [ ] Dark mode persistence
- [ ] Advanced filtering for project archive
- [ ] Performance optimizations
- [ ] SEO improvements
- [ ] Internationalization (i18n)

---

**Made with ❤️ by Gautham Krishna**
