const dbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY;
const nextUrl = process.env.NEXT_PUBLIC_SITE_URL;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!dbUrl || !serviceKey || !nextUrl || !baseUrl) {
  throw new Error("Missing environment variables");
}

export { dbUrl, serviceKey, nextUrl, baseUrl };
