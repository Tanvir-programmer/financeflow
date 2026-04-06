# FinanceFlow - Personal Finance Dashboard

A modern, responsive personal finance management application built with React and Vite. Track your income, expenses, and financial insights with an intuitive dashboard interface.

## 🚀 Features

### Core Functionality

- **Dashboard Overview**: Real-time display of total balance, income, expenses, and savings rate
- **Transaction Management**: Add, edit, delete, and view financial transactions with full CRUD operations
- **Financial Insights**: Visual charts showing income vs expenses trends and spending breakdowns by category
- **Advanced Filtering**: Search, filter by type/category, and sort transactions
- **Role-Based Access**: Admin and Viewer roles with appropriate permissions

### User Experience

- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Optimized for desktop and mobile devices
- **Data Persistence**: All data saved to localStorage for offline access
- **Interactive Charts**: Built with Recharts for beautiful data visualization
- **Modal Editing**: Clean modal interface for transaction editing

### Technical Features

- **Modern React**: Using React 19 with hooks and context API
- **Fast Development**: Vite for lightning-fast hot module replacement
- **Styling**: Tailwind CSS with DaisyUI components for consistent UI
- **Routing**: React Router for seamless navigation
- **Type Safety**: ESLint configuration for code quality

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + DaisyUI
- **Charts**: Recharts
- **Routing**: React Router v7
- **Icons**: Lucide React
- **State Management**: React Context API
- **Data Persistence**: LocalStorage

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd finance-dashboard
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
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/
│   └── Navbar.jsx          # Navigation with role switcher and dark mode
├── context/
│   └── FinanceContext.jsx  # Global state management
├── dashboard/
│   ├── Dashboard.jsx       # Main overview page
│   ├── Boxes.jsx           # Dashboard cards component
│   └── boxes/
│       └── Box.jsx         # Individual metric box
├── insights/
│   └── Insights.jsx        # Financial analysis and charts
├── layouts/
│   └── layout.jsx          # Main app layout wrapper
├── routes/
│   └── routes.jsx          # React Router configuration
├── Transactions/
│   └── Transactions.jsx    # Transaction CRUD interface
├── App.css                # Global styles
├── index.css              # Tailwind imports
├── main.jsx               # App entry point
└── assets/                # Static assets
```

## 🎯 Usage

### Navigation

- **Dashboard**: Overview of your financial status
- **Transactions**: Manage your income and expense records
- **Insights**: Analyze spending patterns and trends

### User Roles

- **Admin**: Full access to add, edit, and delete transactions
- **Viewer**: Read-only access to view data

### Key Interactions

- Click the role dropdown in the navbar to switch between Admin/Viewer
- Use the dark mode toggle for theme switching
- Click "Edit" on transactions to open the edit modal
- Filter and search transactions using the provided controls

## 📊 Data Management

The application uses localStorage to persist:

- User role preferences
- Transaction data
- Dark mode settings

Sample data is provided for demonstration purposes.

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality

- ESLint configuration for React best practices
- Consistent code formatting
- Type-aware linting (when using TypeScript)

## 🎨 Customization

### Themes

The app supports both light and dark modes. Theme switching is handled automatically and persisted across sessions.

### Styling

Built with Tailwind CSS utility classes and DaisyUI components. Easily customizable by modifying the Tailwind configuration.

### Charts

Financial charts are powered by Recharts. Chart configurations can be modified in the Insights component.

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:

- Desktop computers
- Tablets
- Mobile devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

#Notes

- The app is intentionally static/mock data-first with no backend.
- Addition: saving into local storage for improved demo flow.
- Good candidate for future optional enhancements (CSV export, charts library, REST API).
