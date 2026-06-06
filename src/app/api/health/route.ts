export async function GET() {
  return Response.json({
    ok: true,
    service: "problend-digital-os",
    timestamp: new Date().toISOString()
  });
}
