# Acha Platform - AI Coding Guidelines

## Architecture Overview
Full-stack delivery/travel platform with React/TypeScript frontend and Node.js/Express/MongoDB backend. Supports buyers, senders, receivers, travellers, and delivery partners with role-based access control.

## Tech Stack
- **Frontend**: React 19 + TypeScript + Vite + TailwindCSS + i18next (EN/AM)
- **Backend**: Node.js + Express + MongoDB/Mongoose + JWT + bcrypt
- **Dev**: Client port 3000 (proxies /api to 5000), server port 5000

## Key Patterns
- **Forms**: Controlled components with try/catch error handling, success/error messages
- **API**: RESTful endpoints via fetch, base URL switches prod/dev (acha-eeme.onrender.com vs /api)
- **Auth**: JWT tokens, role-based restrictions (super_admin > admin > customer_support > marketing_team > individual/delivery_partner)
- **Security**: Audit logs for all user actions, IP tracking, rate limiting, secure codes for restricted roles
- **Uploads**: Multer for file handling, served statically from /uploads

## Development Workflow
```bash
# Start backend (server/)
npm start  # or node index.js

# Start frontend (client/)
npm run dev  # Vite dev server with proxy

# Build frontend
npm run build  # tsc -b && vite build
```

## Business Logic
- **Delivery Fees**: Calculated by mechanism (cycle-rider/e-bike-rider/motorcycle-rider) + distance in km, returns Birr
- **Roles**: Restricted roles require secure codes from .env, only super_admin can create them
- **i18n**: Language stored in localStorage, defaults to 'en'

## File Structure Conventions
- **Components**: Feature-based in /components, forms in /components/forms
- **Pages**: Route-based in /pages (PostTrip, BrowseTrips, etc.)
- **Backend**: MVC pattern - models/, controllers/, routes/, middleware/
- **Utils**: Business logic in /utils (deliveryFee.ts), helpers in /utils (generateUniqueId.js)

## API Response Format
```json
{"status": "success", "data": {...}} // or {"status": "error", "message": "..."}
```

## Examples
- **Fee Calculation**: `calculateDeliveryFee('e-bike-rider', 5)` → 130 + (18*5) = 220 Birr
- **Role Creation**: Requires code verification + audit logging
- **File Upload**: FormData with 'file' key, returns {file: {path: "/uploads/..."}}

Reference: [server/USER_ROLES_README.md](server/USER_ROLES_README.md) for security details</content>
<parameter name="filePath">c:\Users\HP\Acha\.github\copilot-instructions.md