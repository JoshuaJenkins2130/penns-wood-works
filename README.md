# Penn's Wood Works

A two-page Next.js storefront prototype with:

- Rustic branded home page
- Horizontal product rows
- Product detail modal
- Persistent shopping cart
- Checkout page
- Product thumbnails beside checkout items
- Local pickup, delivery, and shipping choices
- PayPal, Venmo, and Cash App Pay selections
- Review-order confirmation modal

## Run locally

1. Install Node.js 20 or newer.
2. Open a terminal in this folder.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open `http://localhost:3000`.

## Important

Payment processing is currently in demo mode. No real payment is taken. Live PayPal/Venmo and Cash App Pay connections require the owner's verified business accounts and API credentials.

Replace the placeholder SVG files in `public/products` with real product photos using the same filenames, or update the image paths in `lib/products.ts`.
