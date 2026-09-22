# 🔗 Bitlinks — Modern URL Shortener

**Bitlinks** is a modern, full-stack URL shortening platform built with **Next.js, MongoDB, NextAuth.js, and Tailwind CSS**.

It allows users to transform long URLs into short, customizable links and manage all their generated links from a personal dashboard. Bitlinks includes secure authentication, user-specific URL management, editing, deletion, copying, and redirection functionality through a clean and responsive interface.

---

## ✨ Features

### 🔗 URL Shortening

* Convert long URLs into short, easy-to-share links.
* Create custom short URL slugs.
* Generate links using your own memorable names.
* Redirect short URLs to their original destinations.

### 👤 Authentication

* Secure user authentication using **NextAuth.js**.
* GitHub OAuth login.
* Credentials-based authentication.
* Protected routes for authenticated users.
* Session-based authorization for API requests.
* Users can only manage their own URLs.

### 📊 Personal URL Dashboard

* View all URLs created by the currently authenticated user.
* Display the generated short URL.
* Display the original URL.
* Display URL creation date.
* Show the total number of links.
* Automatically refresh the URL list after creating a new link.

### ✏️ URL Editing

* Edit an existing short URL.
* Update the original destination URL.
* Automatically load existing URL data into the editing form.
* Smoothly navigate to the form when the user clicks **Edit**.
* Save changes without manually refreshing the page.

### 🗑️ URL Deletion

* Delete previously created URLs.
* Confirmation before deletion.
* Immediately remove deleted URLs from the dashboard.
* Server-side authorization prevents users from deleting another user's URLs.

### 📋 Copy Short URLs

* Copy generated short URLs directly to the clipboard.
* Toast notification confirms successful copying.

### 🚨 Validation & Notifications

* Prevent whitespace in custom short URLs.
* Validate data before sending API requests.
* Error notifications using React Toastify.
* Success notifications for URL creation, editing, deletion, and copying.
* Proper unauthorized and API error handling.

### 📱 Responsive Design

* Fully responsive interface.
* Desktop and mobile layouts.
* Mobile hamburger navigation.
* Slide-in mobile sidebar.
* Responsive URL management cards.
* Modern dark UI.

---

# 🛠️ Tech Stack

## Frontend

| Technology         | Purpose                       |
| ------------------ | ----------------------------- |
| **Next.js**        | Full-stack React framework    |
| **React**          | User interface                |
| **Tailwind CSS**   | Styling and responsive design |
| **JavaScript**     | Application logic             |
| **React Toastify** | Toast notifications           |
| **Next.js Link**   | Client-side navigation        |

## Backend

| Technology                    | Purpose                     |
| ----------------------------- | --------------------------- |
| **Next.js API Routes**        | Backend API endpoints       |
| **NextAuth.js**               | Authentication and sessions |
| **MongoDB**                   | Database                    |
| **MongoDB Atlas**             | Production database hosting |
| **Mongoose / MongoDB Driver** | Database communication      |
| **bcryptjs**                  | Password hashing            |

## Authentication

* NextAuth.js
* GitHub OAuth
* Credentials Provider
* Session-based authorization
* Secure server-side session verification

## Deployment

* **Vercel** — Next.js application hosting
* **MongoDB Atlas** — Cloud database
* **GitHub** — Source code and version control

---

# 🏗️ Project Architecture

```text
                    ┌──────────────────┐
                    │     Bitlinks     │
                    │   Web Interface  │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │     Next.js      │
                    │   App Router     │
                    └────────┬─────────┘
                             │
             ┌───────────────┼────────────────┐
             │               │                │
             ▼               ▼                ▼
       Authentication     API Routes      Frontend
       NextAuth.js        /api/generate    React
       GitHub OAuth       /api/urls        Tailwind
       Credentials        /api/urls/[id]
             │               │
             │               ▼
             │        ┌───────────────┐
             └───────►│    MongoDB    │
                      │     Atlas      │
                      └───────────────┘
```

---

# 📁 Project Structure

```text
bitlinks/
│
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.js
│   │   │
│   │   ├── generate/
│   │   │   └── route.js
│   │   │
│   │   └── urls/
│   │       ├── route.js
│   │       └── [id]/
│   │           └── route.js
│   │
│   ├── about/
│   │   └── page.js
│   │
│   ├── login/
│   │   └── page.js
│   │
│   ├── shortner/
│   │   └── page.js
│   │
│   ├── ...
│   │
│   └── layout.js
│
├── components/
│   └── ...
│
├── lib/
│   └── mongodb.js
│
├── models/
│   └── User.js
│
├── public/
│   └── ...
│
├── .env.local
├── .gitignore
├── package.json
├── next.config.js
└── README.md
```

---

# 🔐 Authentication System

Bitlinks uses **NextAuth.js** to manage authentication and sessions.

Users can authenticate using:

```text
GitHub OAuth
      │
      ▼
GitHub Authorization
      │
      ▼
NextAuth.js
      │
      ▼
Authenticated Session
      │
      ▼
Bitlinks Dashboard
```

Credentials authentication is also supported for users who register using email/password.

Passwords are hashed using:

```text
bcryptjs
```

Sensitive credentials are stored in environment variables rather than inside the source code.

---

# 🔗 URL Generation

When a user creates a short URL, Bitlinks sends the URL data to the backend:

```http
POST /api/generate
```

Example request:

```json
{
  "url": "https://www.example.com/very-long-url",
  "shorturl": "my-link"
}
```

The server verifies the user's session and stores the URL in MongoDB.

A generated link can then be accessed through:

```text
https://your-domain.com/my-link
```

---

# 📊 URL Management

Authenticated users can retrieve their URLs using:

```http
GET /api/urls
```

The server identifies the authenticated user from the NextAuth session and returns only that user's URLs.

Example data:

```json
{
  "url": "https://example.com",
  "shorturl": "example",
  "userId": "...",
  "email": "...",
  "username": "...",
  "createdAt": "..."
}
```

The dashboard maps this data into responsive URL cards.

---

# ✏️ Edit URL

Existing URLs can be edited through:

```http
PUT /api/urls/:id
```

Users can modify:

* Original URL
* Custom short URL

The interface automatically loads the selected URL into the form.

After saving, the dashboard updates without requiring a page reload.

---

# 🗑️ Delete URL

URLs can be removed using:

```http
DELETE /api/urls/:id
```

The server verifies the authenticated session and ensures that the requested URL belongs to the current user before deleting it.

---

# 🔒 Security

Security is an important part of Bitlinks.

### Environment Variables

Sensitive information is stored in environment variables:

```env
MONGODB_URI=
GITHUB_ID=
GITHUB_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```

`.env.local` should never be committed to GitHub.

### User Authorization

API routes verify the authenticated session before performing protected operations.

```text
User
 │
 ▼
NextAuth Session
 │
 ▼
API Authorization
 │
 ├── Authorized → Continue
 │
 └── Unauthorized → 401
```

### User URL Isolation

Each URL is associated with its authenticated user.

```text
User A
 ├── URL 1
 ├── URL 2
 └── URL 3

User B
 ├── URL 4
 └── URL 5
```

User A cannot edit or delete User B's URLs through the protected API.

---

# 🚨 Form Validation

Bitlinks performs client-side validation before submitting URL operations.

Custom short URLs cannot contain whitespace.

For example:

```text
my-awesome-link       ✅
github-profile        ✅
my awesome-link       ❌
my link               ❌
```

Invalid input produces a toast notification instead of sending the request to the API.

---

# 🔔 Toast Notifications

Bitlinks uses **React Toastify** to provide user feedback.

Examples include:

```text
✅ URL generated successfully
✅ URL updated
✅ URL copied
⚠️ URL deleted
❌ Something went wrong
❌ Spaces are not allowed
```

This provides immediate feedback without interrupting the user experience.

---

# 📱 Responsive Navigation

The application includes a responsive navigation system.

### Desktop

```text
Logo | Home | About | Shortener | Contact | Try Now
```

### Mobile

```text
Logo                         ☰
                             
        ↓ Click
                             
┌──────────────────────┐
│ Bitlinks          ×  │
│                      │
│ Home                 │
│ About                │
│ Shortener            │
│ Contact              │
│                      │
│     Try Now →        │
└──────────────────────┘
```

The mobile sidebar includes:

* Smooth opening animation
* Close button
* Navigation links
* Background overlay
* Responsive styling

---

# 🎨 UI & Design

Bitlinks follows a modern dark-themed design system.

### Design characteristics

* Dark background
* Glass-style cards
* Rounded corners
* Subtle borders
* Blue accent colors
* Hover animations
* Smooth transitions
* Responsive layouts
* Minimal and clean interface

The UI is built primarily with **Tailwind CSS**, keeping the interface consistent and responsive.

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone https://github.com/your-username/bitlinks.git
```

## 2. Navigate into the project

```bash
cd bitlinks
```

## 3. Install dependencies

```bash
npm install
```

## 4. Create `.env.local`

Create a file named:

```text
.env.local
```

Add:

```env
MONGODB_URI=your_mongodb_connection_string

GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

NEXT_PUBLIC_HOST=http://localhost:3000
```

## 5. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 🔑 GitHub OAuth Configuration

For GitHub authentication, create/configure a GitHub OAuth application.

For local development, the callback URL should correspond to:

```text
http://localhost:3000/api/auth/callback/github
```

For production, configure your deployed domain:

```text
https://your-domain.com/api/auth/callback/github
```

Keep the GitHub client secret private and store it in environment variables.

---

# 🌐 Deployment

Bitlinks can be deployed using **Vercel**.

### Deployment flow

```text
GitHub Repository
       │
       ▼
     Vercel
       │
       ▼
 Next.js Production App
       │
       ▼
 MongoDB Atlas
```

Add your production environment variables in the Vercel project settings.

Example:

```env
MONGODB_URI=production_mongodb_uri
GITHUB_ID=production_github_id
GITHUB_SECRET=production_github_secret
NEXTAUTH_SECRET=production_secret
NEXTAUTH_URL=https://your-domain.com
NEXT_PUBLIC_HOST=https://your-domain.com
```

Never commit production secrets to GitHub.

---

# 📡 API Endpoints

| Method   | Endpoint        | Purpose                       |
| -------- | --------------- | ----------------------------- |
| `POST`   | `/api/generate` | Create a short URL            |
| `GET`    | `/api/urls`     | Get authenticated user's URLs |
| `PUT`    | `/api/urls/:id` | Update a URL                  |
| `DELETE` | `/api/urls/:id` | Delete a URL                  |
| `GET`    | `/api/auth/*`   | NextAuth authentication       |

---

# 🔄 Application Flow

### Creating a URL

```text
Enter Original URL
        ↓
Enter Custom Short URL
        ↓
Validation
        ↓
Check Authentication
        ↓
POST /api/generate
        ↓
MongoDB
        ↓
URL Created
        ↓
Dashboard Refresh
        ↓
New URL Card
```

### Editing a URL

```text
Click Edit
    ↓
Load URL into form
    ↓
Scroll to form
    ↓
Edit URL
    ↓
Save Changes
    ↓
PUT /api/urls/:id
    ↓
MongoDB
    ↓
Update Dashboard
```

### Deleting a URL

```text
Click Delete
     ↓
Confirmation
     ↓
DELETE /api/urls/:id
     ↓
Authorization Check
     ↓
MongoDB
     ↓
Remove URL
     ↓
Update UI
```

---

# 🧰 Available Scripts

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

---

# 🚀 Future Improvements

Potential future features for Bitlinks include:

* 📈 Click analytics
* 📊 Link statistics dashboard
* 🌍 Geographic analytics
* 📱 Device/browser analytics
* ⏳ Link expiration
* 🔒 Password-protected links
* 🏷️ Link tags/categories
* 📤 QR code generation
* 📋 Bulk URL creation
* 🔍 URL search and filtering
* 🌐 Custom domains
* 📊 Advanced analytics
* 🌙 Additional theme options

---

# 🤝 Contributing

Contributions are welcome.

### Fork the repository

```bash
git fork
```

### Create a feature branch

```bash
git checkout -b feature/your-feature
```

### Commit your changes

```bash
git commit -m "Add your feature"
```

### Push the branch

```bash
git push origin feature/your-feature
```

Then open a Pull Request.

---

# 📄 License

This project is available for educational and personal development purposes.

Add an appropriate open-source license to the repository if you intend to accept external contributions or redistribute the project.

---

# 👨‍💻 Author

**Aryan Thakor**

Built with ❤️ using:

**Next.js • React • Tailwind CSS • NextAuth.js • MongoDB • GitHub OAuth**

---

## ⭐ Support

If you find Bitlinks useful, consider giving the repository a ⭐ on GitHub.

```text
Short links.
Simple management.
Powerful possibilities. 🚀
```
