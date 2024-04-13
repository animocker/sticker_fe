import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import {Database} from "./db/database.types";

const supabaseUrl = "https://mbghqwtvtqguhyzmtttp.supabase.co";
const supabaseAnonKey =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1iZ2hxd3R2dHFndWh5em10dHRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIwMjg5NTMsImV4cCI6MjAyNzYwNDk1M30.zQcAinEMToAL8sOcQrBbNSFyjy5F49dIutK24Z0X90o";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
