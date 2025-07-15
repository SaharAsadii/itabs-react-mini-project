# ITabs React Mini Project

A React-based dashboard application for managing container logistics and smart matching of empty containers with export bookings.

## 📁 Project Structure

```
itabs-react-mini-project/


└── 📁 src/                          # Source code directory

    ├── 📄 App.tsx                   # Root React component with header and SmartMatch feature
    │
    ├── 📁 styles/                   # Global styling files
    │   └── 📄 App.scss              # Global application styles and CSS variables
    │
    ├── 📁 utils/                    # Utility functions and helpers
    │   └── 📄 convert-date.ts       # Date formatting utility (MM/DD/YYYY format)
    │
    ├── 📁 services/                 # External API communication layer
    │   └── 📄 api.ts                # Axios instance with base URL and Bearer token auth
    │
    ├── 📁 components/               # Reusable UI components library
    │   ├── 📄 index.ts              # Export for all components
    │   │
    │   ├── 📁 button/               # Custom button component
    │   │   ├── 📄 index.tsx         # Button component with variant prop support
            ├── 📄 button.types.ts   # Button component types
    │   │   └── 📄 button.scss       # Button-specific styling and variants
    │   │
    │   ├── 📁 switch/               # Toggle switch component
    │   │   ├── 📄 index.tsx         # Switch component for enable/disable functionality
            ├── 📄 switch.types.ts   # Switch component types
    │   │   └── 📄 switch.scss       # Switch styling with animations and states
    │   │
    │   └── 📁 badge/                # Badge component for displaying values
    │       ├── 📄 index.tsx         # Badge component for savings indicators
            ├── 📄 badge.types.ts    # Badge component types
    │       └── 📄 badge.scss        # Badge styling with color variations
    │
    └── 📁 features/                 # Feature-specific modules and business logic
        ├── 📄 index.ts              # Export for all features
        │
        └── 📁 smart-match/          # Smart container matching feature
            ├── 📄 index.tsx         # Main SmartMatch component with state management
            ├── 📄 smart-match.types.ts        # TypeScript interfaces for:
            │                                  #   - Container (empty container data)
            │                                  #   - Export (export booking data)
            │                                  #   - Address, Company, Specifications
            │                                  #   - API response structures
            ├── 📄 smart-match.constants.ts    # Constants for table headers and configuration
            ├── 📄 smart-match.styles.scss     # Feature-specific styling for tables and layout
            │
            ├── 📁 components/       # Smart-match specific components
            │   ├── 📄 index.ts      # Export for smart-match components
            │   ├── 📄 data-row.tsx           # Individual row component for container data
            │   ├── 📄 empties-table.tsx      # Table component for empty containers display
            │   ├── 📄 exports-table.tsx      # Table component for export bookings display
            │   ├── 📄 loading-state.tsx      # Loading and error state wrapper component
            │   ├── 📄 smart-match-header.tsx # Header component with toggle and filters
            │   └── 📄 table-headers.tsx      # Table headers component
            │
            ├── 📁 hooks/            # Custom React hooks for state management
            │   ├── 📄 index.ts      # Export for custom hooks
            │   ├── 📄 use-smart-match-data.ts    # Hook for data fetching and API calls
            │   └── 📄 use-smart-match-state.ts   # Hook for component state management
            │
            └── 📁 utils/            # Business logic and utility functions
                ├── 📄 index.ts      # Export for utility functions
                └── 📄 smart-match-utils.ts       # Core logic for matching
```

### 📝 File Descriptions

#### **Root Configuration Files**

- **`package.json`**: Defines project dependencies (React 19, TypeScript, Axios, Iconsax React), dev dependencies (Vite, ESLint, Sass), and npm scripts
- **`vite.config.js`**: Configures Vite build tool with React plugin, TypeScript path resolution, and API proxy to `https://itabs.com.tr`
- **`tsconfig.json`**: TypeScript configuration with strict mode, ESNext target, and path mapping for `@/*` aliases
- **`eslint.config.js`**: ESLint setup for code quality with React hooks linting rules

#### **Source Code Structure**

- **`src/main.tsx`**: Application bootstrap file that renders the App component into the DOM root
- **`src/App.tsx`**: Main application shell with header and SmartMatch dashboard integration

#### **Components Architecture**

- **Reusable UI Components**: Self-contained components with their own styling in separate folders
- **Feature Components**: Business logic components specific to smart-match functionality
- **Barrel Exports**: `index.ts` files provide clean import paths and encapsulation

#### **Smart Match Feature**

- **Types**: Comprehensive TypeScript interfaces for container logistics data structures
- **Constants**: Configuration values and table headers for consistent UI rendering
- **Styles**: SCSS styling specific to the smart matching dashboard layout
- **Sub-components**: Specialized table components for different data types (empties vs exports)

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
   git clone https://github.com/SaharAsadii/itabs-react-mini-project.git
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
- **Badge**: Show savings value

## 🔄 State Management

The application uses React's built-in state management:

- `useState` for component-level state
- `useEffect` for data fetching and side effects
- Props drilling for simple data passing between components

## 📞 Support

For support or questions, please contact sahar.codes@gmail.com.

---

Built with ❤️ using React and TypeScript
