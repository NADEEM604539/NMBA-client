import { EmailClient } from "@azure/communication-email";

const AZURE_CONNECTION_STRING = process.env.AZURE_COMMUNICATION_CONNECTION_STRING;
const AZURE_SENDER_EMAIL = process.env.AZURE_SENDER_EMAIL;

let emailClient = null;

function getEmailClient() {
  if (!emailClient && AZURE_CONNECTION_STRING) {
    emailClient = new EmailClient(AZURE_CONNECTION_STRING);
  }
  return emailClient;
}

/**
 * Send order confirmation email via Azure Communication Services
 * @param {Object} params - Email parameters
 * @param {string} params.userEmail - Customer's actual email (will receive the email)
 * @param {string} params.userName - Customer's name
 * @param {number} params.orderId - Order ID
 * @param {number} params.totalPrice - Order total price
 * @param {Array} params.items - Order items array
 */
export async function sendOrderConfirmationEmail({
  userEmail,
  userName,
  orderId,
  totalPrice,
  items = [],
}) {
  try {
    if (!AZURE_CONNECTION_STRING || !AZURE_SENDER_EMAIL) {
      console.warn('Azure Communication Services not configured. Email not sent.');
      return { success: false, message: 'Azure not configured' };
    }

    const client = getEmailClient();
    if (!client) {
      return { success: false, message: 'Failed to initialize Azure Email Client' };
    }

    // Format order items for email
    const itemsList = items
      .map((item) => `- ${item.product_name}: ${item.quantity} x Rs.${item.price}`)
      .join('\n');

    const emailContent = `
Dear ${userName},

Thank you for your order! Your order has been confirmed.

ORDER DETAILS:
Order ID: #${orderId}
Total Amount: Rs.${totalPrice}

ITEMS:
${itemsList}

Your order will be processed and shipped soon. We'll notify you with tracking details once it ships.

Best regards,
Afias Herbal Oil Team
    `.trim();

    // Send email via Azure
    const message = {
      senderAddress: AZURE_SENDER_EMAIL,
      recipients: {
        to: [
          {
            address: userEmail,
            displayName: userName,
          },
        ],
      },
      content: {
        subject: `Order Confirmation - #${orderId}`,
        plainText: emailContent,
        html: `<pre style="font-family:Arial, sans-serif; white-space: pre-wrap;">${emailContent}</pre>`,
      },
    };

    const poller = await client.beginSend(message);
    const result = await poller.pollUntilDone();

    console.log(`Order confirmation email sent to ${userEmail}`);
    console.log(`Message ID: ${result.id}`);

    return { success: true, email: userEmail, orderId, messageId: result.id };
  } catch (error) {
    console.error('Error sending email via Azure:', error.message);
    return {
      success: false,
      message: error.message,
    };
  }
}

