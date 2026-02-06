const dbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY;

if (!dbUrl || !serviceKey) {
  throw new Error("Missing environment variables");
}

export { dbUrl, serviceKey };
