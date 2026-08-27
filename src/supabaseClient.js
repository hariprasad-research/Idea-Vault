import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mvcstbliqcdjfvzikxmc.supabase.co/";
const supabaseAnonKey = "sb_publishable_XDVpXtsgHeXfQzePKe5aGA_-9FiTmZE";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);