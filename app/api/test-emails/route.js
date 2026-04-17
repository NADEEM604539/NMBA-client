// This endpoint is deprecated - using SendGrid for real emails now
// Emails are sent directly to customer inboxes (Gmail, Outlook, etc.)

export async function GET(request) {
  return Response.json({
    message: "This endpoint is deprecated",
    info: "Project now uses SendGrid to send real emails to customer inboxes",
    documentation: "See SENDGRID_SETUP.md for details"
  });
}
