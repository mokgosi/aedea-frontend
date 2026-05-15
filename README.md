# 📬 IdeaHub Frontend

A React frontend for managing contact submissions, built with:

---

# 📦 Tech Stack

- React
- Vite
- Axios
- React Router DOM
- Tailwind CSS
- Google reCAPTCHA

---


# 📥 Docker Installation  -  coupled with Backend(Api)

If not done using Frontend README yet

```bash
$ git clone git@github.com:mokgosi/aedea-app.git
$ cd aedea-app
```

Then read throgh README.md for further installation instructions.


 -----  OR  ----


# 📥  Standalonne Installation

If not done using API README yet

## 1. Clone main app

```bash
$ git clone git@github.com:mokgosi/aedea-frontend.git
$ cd aedea-frontend

```

## 2. Install Dependencies

```bash
npm install
```

## 3. Create environment file
Create .env in root:

```bash
$ cp .env-example .env

VITE_API_BASE_URL=http://localhost:8000/api
VITE_RECAPTCHA_SITE_KEY=your_site_key_here
```

## 4. Run development server

```bash
npm run dev
```

Your frontend runs here: http://localhost:5173

