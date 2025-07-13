# Smart Match Dashboard

A modern React-based dashboard application for managing container logistics and smart matching of empty containers with export bookings.

## 🚀 Features

- **Smart Match System**: Intelligent matching of empty containers with export bookings
- **Container Management**: Track containers, chassis, and their status
- **Export Tracking**: Monitor export bookings with appointments and deadlines
- **Interactive Dashboard**: Toggle smart match functionality with real-time updates
- **Data Visualization**: Clean grid-based layout for logistics data
- **Modern UI**: Built with React, TypeScript, and SCSS

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── button/         # Custom button component
│   └── switch/         # Toggle switch component
├── features/           # Feature-specific modules
│   └── smart-match/    # Smart match functionality
├── services/           # API services and data fetching
├── styles/             # Global styles and SCSS files
└── utils/              # Utility functions (date formatting, etc.)
```

## 🛠️ Tech Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: SCSS for component styling
- **Build Tool**: Vite for fast development and building
- **HTTP Client**: Axios for API communication
- **Icons**: Iconsax React for modern icons
- **Linting**: ESLint for code quality

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (version 18 or higher)
- npm or yarn package manager

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone <your-repository-url>
   cd itabs-react-mini-project
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality checks

## 🔧 API Configuration

The application connects to a test API endpoint configured in `src/services/api.ts`:

- **Base URL**: `/api/testapi`
- **Authentication**: Bearer token authentication
- **Primary Endpoint**: `/inhouse` for fetching container and export data

## 📊 Data Flow

1. **Container Data**: Fetches empty container inventory with location and availability
2. **Export Data**: Retrieves export bookings with schedules and requirements
3. **Smart Matching**: Algorithms suggest optimal container-booking pairs
4. **Savings Calculation**: Displays potential cost savings from smart matches

## 🎨 UI Components

### SmartMatch Dashboard

- Header with smart match toggle and filter options
- Grid-based data table with:
  - Container information (size, SSL, chassis)
  - Empty container details (gated dates, return terminals)
  - Export booking data (appointments, deadlines, pickup locations)
  - Cost savings indicators

### Reusable Components

- **Button**: Customizable button with variant support
- **Switch**: Toggle component for enabling/disabling features

## 🔄 State Management

The application uses React's built-in state management:

- `useState` for component-level state
- `useEffect` for data fetching and side effects
- Props drilling for simple data passing between components

## 📝 Type Safety

Fully typed with TypeScript interfaces including:

- `Container`: Container specifications and status
- `Booking`: Export booking details
- `ApiResponse`: API response structure
- `ListData`: Combined container and export data

## 🎯 Future Enhancements

- Real-time data updates with WebSocket integration
- Advanced filtering and sorting capabilities
- Export functionality for reports
- Mobile-responsive design improvements
- User authentication and role-based access

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 📞 Support

For support or questions, please contact sahar.codes@gmail.com.

---

Built with ❤️ using React and TypeScript
