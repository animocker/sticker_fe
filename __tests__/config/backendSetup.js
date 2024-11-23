import { supabase } from "../../backend/supabase";
import initialize from "../../backend/Initializer";


//TODO setup tests to run sequentially, to be able run multiple tests with single setup
beforeEach(async () => {
    await supabase.auth.signInWithPassword({ email: process.env.TEST_LOGIN, password: process.env.TEST_PASSWORD });
    await initialize();
}, 10000);