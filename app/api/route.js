export async function GET() {
  return Response.json({ ok: true, service: "api-root", time: new Date().toISOString() });
}
