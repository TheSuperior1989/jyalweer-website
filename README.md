# Jy Alweer? 🇿🇦

A South African meme merchandise e-commerce store built with modern web technologies.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8)

## 🎯 Features

- 🛍️ **E-commerce Store** - Browse and purchase South African meme merchandise
- 🎨 **Meme Gallery** - Daily featured memes from the Jy Alweer Facebook page
- 🔐 **Authentication** - Secure user accounts with Supabase Auth
- 🛒 **Shopping Cart** - Add products, manage quantities, and checkout
- 💳 **Stripe Integration** - Secure payment processing (coming soon)
- 📧 **Email Notifications** - Order confirmations via Resend (coming soon)
- 🌍 **Bilingual** - Full Afrikaans and English support
- 👨‍💼 **Admin Dashboard** - Manage products, orders, and memes
- 📱 **Responsive Design** - Works on all devices
- 🔄 **Facebook Sync** - Auto-sync memes from Facebook page

## 🚀 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** [Supabase](https://supabase.com/) (PostgreSQL)
- **Authentication:** Supabase Auth
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Payments:** [Stripe](https://stripe.com/) (coming soon)
- **Email:** [Resend](https://resend.com/) (coming soon)
- **Deployment:** [Vercel](https://vercel.com/)

## 📦 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account
- (Optional) Stripe account for payments
- (Optional) Resend account for emails

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TheSuperior1989/jyalweer-website.git
   cd jyalweer-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   
   # Stripe (optional)
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
   STRIPE_SECRET_KEY=
   STRIPE_WEBHOOK_SECRET=
   
   # Resend (optional)
   RESEND_API_KEY=
   
   # Facebook Sync (optional)
   FACEBOOK_PAGE_ID=
   FACEBOOK_ACCESS_TOKEN=
   ```

4. **Set up the database**
   
   Run the SQL schema in your Supabase SQL Editor:
   ```bash
   # Copy contents of scripts/001_create_schema.sql
   # Paste and run in Supabase SQL Editor
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

The project uses the following main tables:

- `profiles` - User profiles and admin status
- `products` - Merchandise catalog
- `memes` - Meme gallery content
- `orders` & `order_items` - Order management
- `shipping_addresses` - User shipping information
- `email_subscribers` - Newsletter subscribers

See `scripts/001_create_schema.sql` for the complete schema.

## 🔄 Facebook Integration

Display memes directly from your Facebook page on your website!

### Option 1: Facebook Embed (No Admin Access Required) ⭐ **ACTIVE**

The website currently uses Facebook's official embed plugins to display posts directly from the Jy Alweer Facebook page.

**Benefits:**
- ✅ No admin access needed
- ✅ Always up-to-date automatically
- ✅ Zero maintenance
- ✅ Legal and compliant

See [FACEBOOK_EMBED_GUIDE.md](./FACEBOOK_EMBED_GUIDE.md) for details.

### Option 2: Facebook Graph API Sync (Requires Admin Access)

If you have admin access to the Facebook page, you can sync memes to your database.

See [FACEBOOK_SYNC_SETUP.md](./FACEBOOK_SYNC_SETUP.md) for setup instructions.

## 🎨 Project Structure

```
jyalweer-website/
├── app/
│   ├── (marketing)/      # Public pages
│   ├── admin/            # Admin dashboard
│   ├── auth/             # Authentication pages
│   └── api/              # API routes
├── components/
│   ├── admin/            # Admin components
│   ├── home/             # Homepage components
│   ├── shop/             # Shop components
│   └── ui/               # Reusable UI components
├── lib/
│   ├── supabase/         # Supabase clients
│   ├── cart-context.tsx  # Shopping cart state
│   └── language-context.tsx # i18n support
├── public/
│   └── assets/memes/     # Meme images
└── scripts/              # Database schemas
```

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel project settings
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/TheSuperior1989/jyalweer-website)

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. Contact the owner for collaboration opportunities.

## 📧 Contact

For questions or support, contact: [Your Email]

---

Made with ❤️ in South Africa 🇿🇦

