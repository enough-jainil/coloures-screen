# Color Screensaver

A dynamic, interactive color screensaver built with Next.js 15 that generates and displays random colors with smooth transitions. The application features a modern, glass-morphic UI design, real-time color information display, and a color history system.

## Features

- 🎨 Random color generation with smooth transitions
- 🎬 Play/Pause functionality with 5-second intervals
- 📺 Fullscreen mode support
- 📸 Screenshot capability with color information
- 💫 Smooth animations and text transitions
- 🎯 Real-time color information (HEX, RGB)
- 🌓 Automatic text contrast adjustment
- 🎭 Glass-morphism UI effects
- 📱 Responsive design
- 🎨 Color history tracking
- ⌨️ Keyboard shortcuts support
- 🔄 Progress bar indication
- 💾 Screenshot download with color details

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom configurations
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Font**: Righteous (Google Fonts)
- **UI Components**:
  - Customized shadcn/ui components
  - Radix UI primitives
  - Custom animated components
- **Build Tool**: Turbopack

## Getting Started

1. Clone the repository:

```bash
git clone [your-repo-url]
```

2. Install dependencies:

```bash
npm install --legacy-peer-deps
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- **Play/Pause**: Toggle automatic color changing (5-second intervals)
- **Fullscreen**: Enter/exit fullscreen mode
- **Screenshot**: Capture and download the current color with its information
- **Color History**: Access previously generated colors
- **Progress Bar**: Visual indication of next color change
- **Animations**: Smooth text transitions for color information
- **Contrast**: Automatic text color adjustment based on background

## Project Structure

- `/app`: Next.js app router files and layouts
- `/components`: React components
  - `color-screensaver.tsx`: Main screensaver component
  - `sliding-counter.tsx`: Animated text transitions
  - `progress-bar.tsx`: Color change progress indicator
  - `/ui`: Reusable UI components
- `/lib`: Utility functions and helpers
  - `utils.ts`: Helper functions
  - `loadFont.ts`: Font loading utilities
  - `types.ts`: TypeScript interfaces
- `/public`: Static assets and resources

## Performance Features

- Optimized animations using Framer Motion
- Efficient color transitions
- Lazy-loaded components
- Font optimization with next/font
- Type-safe development with TypeScript

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.
