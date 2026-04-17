# SendGrid Email Setup

This project sends **real order confirmation emails** to customer inboxes using SendGrid.

## ⚡ Quick Setup (2 Steps)

### Step 1: Get SendGrid API Key

1. Go to [https://sendgrid.com](https://sendgrid.com)
2. Sign up (free account)
3. Go to **Settings** → **API Keys** → **Create API Key**
4. Copy the API key

### Step 2: Add to .env

```
SENDGRID_API_KEY=SG_xxxxxxxxxxxxxxxxxxx
```

That's it! 🎉

## ✅ What Happens Now

When a customer places an order:

1. Order is created in database
2. **Real email is sent to customer's actual email inbox** (Gmail, Outlook, etc.)
3. Email includes order details, items, and total price

**Email goes to:** `john.doe@gmail.com` ✅ (Real inbox)

## 📧 Email Content

Customers receive:

```
Dear John,

Thank you for your order! Your order has been confirmed.

ORDER DETAILS:
Order ID: #12345
Total Amount: Rs.5000

ITEMS:
- Herbal Oil: 2 x Rs.2000
- Cream: 1 x Rs.1000

Your order will be processed and shipped soon.

Best regards,
Afias Herbal Oil Team
```

## 🔧 Important: Verify Email Sender

Before sending real emails, you must verify `orders@afiasherbal.com` in SendGrid:

1. Log into SendGrid dashboard
2. Go to **Sender Authentication** → **Verify a Sender**
3. Add `orders@afiasherbal.com`
4. Verify the domain or email

**Until verified, emails won't be sent!**

## 💰 Free Tier

- ✅ 100 emails per day (free forever)
- ✅ Unlimited days
- ✅ Perfect for testing and small sites

## 📝 Files Modified

- **Email Logic**: [lib/email.js](lib/email.js)
  - Sends real emails via SendGrid
  - To customer's actual email address

- **Order Integration**: [app/api/orders/route.js](app/api/orders/route.js)
  - Automatically sends email after order confirmed

## 🧪 Test It

1. Install dependencies: `npm install`
2. Restart dev server: `npm run dev`
3. Place a test order
4. Check customer's inbox for email (may take 30 seconds)
5. Check spam folder if not in inbox

## 🆘 Troubleshooting

### Emails not arriving?

1. **Check `.env`** - API key is set correctly?
2. **Restart server** - Changes to `.env` need server restart
3. **Check spam folder** - Sometimes emails go to spam
4. **Verify sender email** - Did you verify `orders@afiasherbal.com` in SendGrid?
5. **Check server logs** - Look for error messages

### Common Errors

**"SendGrid not configured"**
- API key missing in `.env`
- Restart dev server

**"Unauthorized"**
- Wrong or invalid API key
- Check SendGrid console for correct key

## 📚 Resources

- [SendGrid Console](https://app.sendgrid.com)
- [SendGrid Docs](https://docs.sendgrid.com)
- [Node.js SendGrid Library](https://github.com/sendgrid/sendgrid-nodejs)

## 🎯 Next Steps

1. Sign up for SendGrid (free)
2. Get API key
3. Add to `.env`
4. Verify email sender domain
5. Start sending real emails!

That's all you need! 🚀


