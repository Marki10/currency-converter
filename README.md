# 💱 Currency Converter (Next.js + TypeScript + Tailwind)

A simple and modern currency converter built with **Next.js**, **React Context**, **TypeScript**, **TailwindCSS**, and tested with **Jest** + **Cypress**.  
It uses the [CurrencyBeacon API](https://currencybeacon.com/) to fetch live exchange rates.

---

## 📦 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + HeadlessUI
- **State Management**: React Context
- **Testing**: Jest, React Testing Library, Cypress

---

## 🛠️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/currency-converter.git
cd currency-converter
```

2. Install dependencies
   npm install

3. Set environment variables

Create .env:

NEXT_PUBLIC_API_KEY=your_currencybeacon_api_key

4. Run development server
   npm run dev

App runs on http://localhost:3000

🧪 Testing
Unit tests (Jest + RTL)
npm run test

E2E tests (Cypress)

# open Cypress UI

npm run cypress

# or headless

npx cypress run
