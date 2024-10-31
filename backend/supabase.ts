import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Database } from "./db/database.types";
import { AppState } from "react-native";

//TODO setup env variables to work with different environments and with jest
const supabaseUrl = "https://putvmjrqftjxkfnqdvjs.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1dHZtanJxZnRqeGtmbnFkdmpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyODUyNTYsImV4cCI6MjA0NTg2MTI1Nn0.u3DmWPbA9G1K6b3upjApKp5WkGXv3T9FNK46AtXig5I";
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
