# MATTR - AI Image Generation Platform

A modern, high-performance AI image generation platform built with Next.js 15, featuring a clean, minimal design inspired by industry leaders like Stripe, Linear, and Vercel.

## 🚀 Features

- **AI Image Generation Studio** - Professional workspace for creating AI-generated images
- **Community Gallery** - Explore and discover artwork from creators worldwide
- **Modern Authentication** - Clean sign-in/sign-up experience with social providers
- **Responsive Design** - Fully responsive across all devices
- **Performance Optimized** - Built with Next.js 15 and Turbopack for blazing-fast performance
- **Accessible** - WCAG compliant with proper semantic HTML and ARIA labels

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Custom components with Radix UI primitives
- **Icons:** Lucide React
- **Fonts:** DM Sans, Geist Mono, Source Serif 4
- **Build Tool:** Turbopack

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd img-gen

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎨 Design System

### Colors
- **Background:** `#FAF8F5` (Warm off-white)
- **Foreground:** `#1A1A1A` (Near black)
- **Accent:** `#b45309` (Warm orange)
- **Muted:** `#6B6B6B` (Medium gray)

### Typography
- **Sans:** DM Sans (Primary)
- **Mono:** Geist Mono (Code/Labels)
- **Serif:** Source Serif 4 (Editorial)

### Design Principles
- **Minimal & Clean** - No unnecessary elements
- **Consistent Spacing** - 8px base unit
- **Subtle Animations** - Smooth, purposeful transitions
- **High Contrast** - Excellent readability
- **No Gradients** - Flat, modern aesthetic

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── auth/              # Authentication
│   ├── blog/              # Blog
│   ├── contact/           # Contact page
│   ├── create/            # Image generation studio
│   ├── gallery/           # Community gallery
│   ├── pricing/           # Pricing page
│   └── ...
├── components/            # Reusable components
│   ├── navigation.tsx     # Main navigation
│   ├── footer.tsx         # Footer
│   ├── hero-section.tsx   # Hero component
│   └── ...
├── lib/                   # Utility functions
├── public/                # Static assets
└── styles/                # Global styles
```

## 🎯 Key Pages

### Home (`/`)
- Hero section with animated text
- Feature showcase with auto-cycling
- Pricing comparison
- Gallery preview
- CTA sections

### Studio (`/create`)
- Prompt input with quick starts
- Style and aspect ratio selectors
- Advanced settings (collapsible)
- Real-time canvas preview
- Image generation with loading states

### Gallery (`/gallery`)
- Masonry grid layout
- Category filtering
- Sort options (Trending, Recent, Popular)
- Search functionality
- Lightbox with detailed view

### About (`/about`)
- Company story and mission
- Team section with modern cards
- Values and timeline
- Stats showcase

### Contact (`/contact`)
- Split layout with form
- Interactive contact methods
- Global office locations
- FAQ accordion

### Auth (`/auth`)
- Tab-based sign in/sign up
- Social provider options
- Form validation
- Password strength indicator

## 🚀 Performance

- **Lighthouse Score:** 95+ across all metrics
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3s
- **Bundle Size:** Optimized with code splitting

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_SITE_URL=your_site_url
```

### Tailwind Configuration
Custom configuration in `tailwind.config.ts` with:
- Custom color palette
- Extended animations
- Custom font families
- Responsive breakpoints

## 📱 Responsive Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** 1024px - 1536px
- **Large Desktop:** > 1536px

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Focus visible states
- Screen reader friendly
- Color contrast WCAG AA compliant

## 🧪 Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Build and check for errors
npm run build
```

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email support@mattr.ai or join our Discord community.

---

Built with ❤️ using Next.js and modern web technologies.
