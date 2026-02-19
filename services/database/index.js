import { createClient } from "@supabase/supabase-js";
import { dbUrl, serviceKey } from "@/utils/env";

const database = createClient(dbUrl, serviceKey);

export default database;
