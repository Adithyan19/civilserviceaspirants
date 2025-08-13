# Civil Servants Club TKMCE - Premium Website

A modern, immersive website for the Civil Servants Club at TKM College of Engineering, built with cutting-edge web technologies and premium design aesthetics.

## 🚀 Features

- **Premium Design**: Dark theme with neon accents, glassmorphism effects, and smooth animations
- **Responsive Layout**: Optimized for all devices (mobile, tablet, desktop)
- **Modern Tech Stack**: React, TypeScript, Tailwind CSS, GSAP, and Node.js
- **Smooth Animations**: GSAP-powered animations with scroll triggers and parallax effects
- **Interactive Components**: Dynamic signup modal, contact forms, and navigation
- **Backend Integration**: Express.js server with RESTful API endpoints

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework with custom configurations
- **GSAP** - Professional-grade animations and scroll effects
- **Lucide React** - Beautiful, customizable icons
- **Vite** - Fast build tool and development server

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger

## 🎨 Design Features

- **Dark Theme**: Elegant dark background with gradient overlays
- **Neon Accents**: Electric blue, purple, and white glow effects
- **Glassmorphism**: Translucent panels with backdrop blur
- **Floating Elements**: Subtle animations and hover effects
- **Custom Scrollbar**: Styled scrollbars with neon glow
- **Responsive Grid**: Adaptive layouts for all screen sizes

## 📁 Project Structure

```
civil-servants-club/
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx       # Navigation header
│   │   ├── Hero.tsx         # Hero section
│   │   ├── About.tsx        # About section
│   │   ├── Contact.tsx      # Contact form
│   │   ├── Footer.tsx       # Footer component
│   │   └── SignupModal.tsx  # Registration modal
│   ├── hooks/               # Custom React hooks
│   │   └── useModal.ts      # Modal state management
│   ├── utils/               # Utility functions
│   │   └── animations.ts    # GSAP animation helpers
│   ├── styles/              # CSS files
│   │   └── locomotive.css   # Smooth scroll styles
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # App entry point
│   └── index.css            # Global styles
├── server/                  # Backend server
│   ├── server.js            # Express server
│   ├── package.json         # Server dependencies
│   └── README.md            # Server documentation
├── public/                  # Static assets
│   └── logo.jpg             # Club logo
├── tailwind.config.js       # Tailwind configuration
├── package.json             # Frontend dependencies
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd civil-servants-club
    ```

2. **Install frontend dependencies**

    ```bash
    npm install
    ```

3. **Install backend dependencies**

    ```bash
    cd server
    npm install
    cd ..
    ```

4. **Set up environment variables**
    ```bash
    cd server
    cp .env.example .env
    # Edit .env with your configuration
    cd ..
    ```

### Development

1. **Start both frontend and backend**

    ```bash
    npm run dev:full
    ```

2. **Or start them separately**

    ```bash
    # Frontend (Terminal 1)
    npm run dev

    # Backend (Terminal 2)
    npm run server
    ```

3. **Open your browser**
    - Frontend: http://localhost:5173
    - Backend API: http://localhost:5000

### Building for Production

```bash
npm run build
```

## 🎯 Key Components

### Header

- Sticky navigation with glassmorphism effect
- Animated logo and club name
- Responsive mobile menu
- Smooth scroll navigation

### Hero Section

- Full-screen immersive design
- Animated text with gradient effects
- Floating logo with orbital elements
- Call-to-action button

### About Section

- Feature cards with hover effects
- Image grid with sample event photos
- Scroll-triggered animations
- Mission statement highlight

### Contact Section

- Floating label contact form
- Real-time validation
- Glowing input borders
- Contact information cards

### Signup Modal

- Glassmorphism design
- Multi-step form with validation
- Smooth entrance/exit animations
- Backend integration

## 🎨 Customization

### Colors

The color palette is defined in `tailwind.config.js`:

- `neon-blue`: #00f5ff
- `neon-purple`: #bf00ff
- `electric-blue`: #0080ff
- `dark-bg`: #0a0a0a

### Animations

GSAP animations are configured in `src/utils/animations.ts`:

- Entrance animations
- Scroll triggers
- Hover effects
- Parallax scrolling

### Styling

Custom styles are in `src/styles/locomotive.css`:

- Smooth scrolling
- Glow effects
- Glass morphism
- Loading animations

## 🔧 API Endpoints

### User Registration

```
POST /api/signup
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "course": "Computer Science",
  "year": "3rd Year",
  "interests": "Civil services preparation"
}
```

### Contact Form

```
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here"
}
```

### Newsletter Subscription

```
POST /api/newsletter
Content-Type: application/json

{
  "email": "john@example.com"
}
```

## 🌟 Features Showcase

- **Smooth Animations**: GSAP-powered entrance and scroll animations
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Interactive Elements**: Hover effects, button animations, and transitions
- **Modern UI/UX**: Clean, professional design with attention to detail
- **Performance Optimized**: Fast loading with optimized assets
- **Accessibility**: Semantic HTML and keyboard navigation support

## 🚀 Deployment

### Frontend (Netlify/Vercel)

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting platform

### Backend (Heroku/Railway/DigitalOcean)

1. Set up environment variables
2. Deploy the `server` folder
3. Update CORS settings for production domain

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

**Civil Servants Club TKMCE**

- Email: civilservants@tkmce.ac.in
- Phone: +91 9876543210
- Location: TKM College of Engineering, Kollam

## 🙏 Acknowledgments

- TKM College of Engineering for support
- React and GSAP communities for excellent documentation
- Pexels for stock images
- Lucide for beautiful icons

---

**Built with ❤️ for Civil Servants Club TKMCE**
