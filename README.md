# TicketApp - Twig Template Version

A complete ticket management system built with Twig templates, vanilla JavaScript, TailwindCSS, and modular architecture.

This is a Twig template implementation of the TicketApp, designed to replicate the functionality and design of the React/Vue versions using server-side templating and vanilla JavaScript.

## 🎨 Features

- **Modern UI**: Beautiful, responsive design with TailwindCSS
- **Authentication**: Login/signup with localStorage simulation
- **Dashboard**: Overview statistics and quick actions
- **Ticket Management**: Full CRUD operations for tickets
- **Status Management**: Track tickets by status (open, in_progress, closed)
- **Priority Levels**: Low, medium, high priority support
- **Local Storage**: Data persistence using localStorage
- **Responsive**: Mobile-first design
- **Toast Notifications**: User feedback system

## 🏗️ Tech Stack

- **Twig** - PHP templating engine
- **Vanilla JavaScript** - ES6 modules for all logic
- **TailwindCSS** - Utility-first CSS framework
- **Webpack/Vite** - Build tool (optional)
- **localStorage** - Client-side data persistence
- **Uuid** - Unique ID generation

## 📁 Project Structure

```
ticket-app-twig/
├── templates/              # Twig template files
│   ├── base.twig           # Base layout
│   ├── landing.twig        # Landing page
│   ├── login.twig          # Login page
│   ├── signup.twig         # Signup page
│   ├── dashboard.twig      # Dashboard page
│   └── tickets.twig        # Tickets management page
├── src/
│   ├── js/                 # JavaScript modules
│   │   ├── main.js         # Entry point
│   │   ├── auth.js         # Authentication module
│   │   ├── tickets.js      # Ticket CRUD operations
│   │   ├── validation.js    # Form validation
│   │   ├── toast.js         # Toast notifications
│   │   └── constants.js     # App constants
│   └── css/
│       └── input.css        # TailwindCSS source
├── public/                  # Compiled/static files
│   ├── css/
│   ├── js/
│   └── index.html
└── Configuration files
```

## 🚀 Getting Started

### Prerequisites

- Node.js and npm
- Optional: PHP with Twig extension (for server-side rendering)

### Installation

```bash
# Install dependencies
npm install
```

### Development

#### Option 1: Static HTML Build (Recommended for now)

Since we're using Twig templates, you have two options:

**Option A: Use PHP Server (If you have PHP with Twig)**

1. Copy files to a PHP environment with Twig
2. Configure Twig template directory
3. Access via PHP server

**Option B: Compile Twig to Static HTML**

1. Use a build tool to compile Twig templates to HTML
2. Serve the static files
3. JavaScript will handle all interactivity

#### Option 2: Direct Static HTML

For quickest start, the templates can be manually converted to static HTML files with the same structure.

### Building

```bash
# Build TailwindCSS
npm run build:tailwind

# Watch TailwindCSS changes
npm run watch:tailwind

# Build for production
npm run build
```

## 🎯 Usage

### Demo Credentials

**Admin:**
- Email: `admin@ticketapp.com`
- Password: `password123`

**User:**
- Email: `user@ticketapp.com`
- Password: `password123`

### Features Explained

#### Authentication
- Login and signup pages with validation
- localStorage-based session management
- Protected routes with JavaScript guards
- Auto-redirect to login if not authenticated

#### Dashboard
- Ticket statistics (total, open, in progress, closed)
- Quick action links
- Recent activity overview
- Real-time stats updates

#### Ticket Management
- Create, read, update, and delete tickets
- Status tracking (open, in_progress, closed)
- Priority levels (low, medium, high)
- Form validation
- Modal-based editing
- Confirmation dialogs for deletion

## 🔧 Architecture

### Module System

The app uses ES6 modules:

```javascript
// Import modules
import { auth } from './js/auth.js';
import { tickets } from './js/tickets.js';
import { showToast } from './js/toast.js';
```

### State Management

- **Authentication**: `auth.js` class handles login/logout
- **Tickets**: `tickets.js` class manages CRUD operations
- **Local Storage**: Persistent state via localStorage
- **Reactive Updates**: Direct DOM manipulation for reactivity

### Key Differences from React/Vue

| Feature | React/Vue | Twig/JS |
|---------|-----------|---------|
| State | useState/ref | Classes + localStorage |
| Components | JSX/Vue SFC | Twig templates |
| Reactivity | Virtual DOM | Direct DOM updates |
| Routing | React Router/Vue Router | Path-based routing |
| Build Tool | Vite | Static compilation |

## 📝 Converting to Static HTML

To make this a completely static site:

1. **Render Twig to HTML**: Use a tool like `twig.js` or manually copy templates
2. **Copy structure**: Create identical HTML structure
3. **Include scripts**: All JS modules remain the same
4. **Serve files**: Use any static file server

### Example Structure

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="./css/styles.css">
</head>
<body>
    <div id="app"></div>
    <script type="module" src="./js/main.js"></script>
</body>
</html>
```

## 🎨 Styling

### TailwindCSS Classes

All React/Vue styling is preserved:
- `btn-primary`, `btn-secondary`, `btn-danger`
- `card`, `input-field`
- `status-open`, `status-in-progress`, `status-closed`
- Same color scheme (primary, success, warning, danger)

### Custom CSS

Located in `src/css/input.css`:
- Font imports (Inter)
- Custom animations (fade-in, slide-up, float)
- Line clamping utilities
- Toast animations

## 🔐 Authentication Flow

1. User submits login/signup form
2. JavaScript validates input
3. Mock authentication (or API call)
4. Store session in localStorage
5. Redirect to dashboard/tickets
6. Check auth status on protected pages

## 🎫 Ticket CRUD Flow

### Create
1. Click "Create Ticket"
2. Fill modal form
3. Validate input
4. Add to tickets array
5. Save to localStorage
6. Update UI
7. Show success toast

### Update
1. Click edit icon on ticket
2. Populate modal with ticket data
3. Modify fields
4. Save changes
5. Update localStorage
6. Refresh UI
7. Show success toast

### Delete
1. Click delete icon
2. Confirm deletion
3. Remove from tickets array
4. Update localStorage
5. Refresh UI
6. Show success toast

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm, md, lg
- Flexible grid layouts
- Touch-friendly buttons
- Mobile navigation menu

## 🚨 Error Handling

- Form validation errors
- Input field highlighting
- Toast notifications
- Confirmation dialogs
- Graceful fallbacks

## 🌟 Key JavaScript Features

### ES6 Modules
```javascript
export const auth = new Auth();
export const requireAuth = () => { /* ... */ };
```

### Classes
```javascript
class Auth {
  constructor() { /* ... */ }
  login() { /* ... */ }
  logout() { /* ... */ }
}
```

### Arrow Functions
```javascript
tickets.getAll().map(ticket => renderTicket(ticket));
```

### Template Literals
```javascript
`Ticket ${ticket.id} - ${ticket.title}`;
```

## 🧪 Testing

Manual testing steps:

1. **Authentication**
   - Test login with valid credentials
   - Test login with invalid credentials
   - Test signup flow
   - Test logout

2. **Tickets**
   - Create new tickets
   - Edit existing tickets
   - Delete tickets
   - Test form validation

3. **Dashboard**
   - Check stats accuracy
   - Verify empty states
   - Test navigation links

## 📊 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- IE11 (with polyfills)

## 🔄 From Template to Static

To convert Twig templates to static HTML:

1. **Use Twig CLI**:
   ```bash
   twig render template.twig output.html
   ```

2. **Manual Conversion**:
   - Replace `{% extends %}` with base HTML structure
   - Replace `{% block %}` with direct HTML
   - Replace variables with JavaScript values
   - Keep all CSS classes and structure

3. **Build Tools**:
   - Webpack with twig-loader
   - Gulp with gulp-twig
   - Custom Node.js script

## 📚 Documentation

- See `TWIG_VS_REACT.md` for framework comparisons
- Comments in code explain module functionality
- Inline documentation for complex functions

## 🐛 Troubleshooting

### localStorage Issues
- Clear browser cache
- Check localStorage quota
- Verify browser support

### Module Errors
- Ensure correct import paths
- Check browser console for errors
- Verify file permissions

### Styling Issues
- Run `npm run build:tailwind`
- Check TailwindCSS config
- Verify CSS file paths

## 📄 License

MIT

## 🙏 Credits

- Original React design and functionality
- Vue 3 implementation as reference
- TailwindCSS for styling
- Twig for templating

