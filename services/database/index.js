import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { dbUrl, serviceKey } from "@/utils/env";

dotenv.config();

const database = createClient(dbUrl, serviceKey);

export default database;
