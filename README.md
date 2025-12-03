# 🌤️ Weather App

A modern, responsive weather application built with Next.js, TypeScript, and Redux Toolkit. Features real-time weather data, location search, and a beautiful glassmorphism UI design.

## ✨ Features

- **Real-time Weather Data**: Current weather and 5-day forecast using OpenWeatherMap API
- **Location Search**: Search for any city worldwide with autocomplete suggestions
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Temperature Units**: Toggle between Celsius (°C) and Fahrenheit (°F)
- **Beautiful UI**: Glassmorphism design with smooth animations
- **TypeScript**: Fully typed for better developer experience
- **Redux State Management**: Centralized state management with Redux Toolkit

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with glassmorphism effects
- **API**: OpenWeatherMap API
- **Icons**: Custom weather icons
- **Fonts**: Nunito font family

## 🏗️ Architecture

- **Clean Architecture**: Separation of concerns with constants, types, and utilities
- **Redux Slices**: API calls handled in Redux slices
- **Custom Hooks**: State management and business logic in custom hooks
- **Component Structure**: Modular and reusable components
- **Type Safety**: Full TypeScript coverage

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
├── Components/             # Reusable UI components
├── constants/              # Centralized constants and types
├── hooks/                  # Custom React hooks
├── store/                  # Redux store and slices
├── assets/                 # Images and icons
└── slices/                 # Prismic CMS slices
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- OpenWeatherMap API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Add your OpenWeatherMap API key to `.env.local`:
```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 API Integration

This app uses the OpenWeatherMap API for weather data:

- Current Weather: `https://api.openweathermap.org/data/2.5/weather`
- 5-Day Forecast: `https://api.openweathermap.org/data/2.5/forecast`
- Geocoding: `https://api.openweathermap.org/geo/1.0/direct`

## 📱 Features in Detail

### Weather Display
- Current temperature with unit toggle
- Weather condition and description
- High/Low temperatures
- Dynamic background images based on weather
- Animated weather icons

### Location Search
- Real-time location suggestions
- Search by city name
- Accurate geolocation using coordinates
- Seamless navigation to weather details

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interactions
- Optimized performance

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons and UI inspiration from various design resources
- Built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/)
