import { createClient } from "@supabase/supabase-js"
import { readFileSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, "..")

// Parse .env.local manually — no extra packages needed
function loadEnv(filepath) {
  try {
    const content = readFileSync(filepath, "utf8")
    const env = {}
    for (const line of content.split("\n")) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith("#")) continue
      const eqIdx = trimmed.indexOf("=")
      if (eqIdx === -1) continue
      const key = trimmed.slice(0, eqIdx).trim()
      let val = trimmed.slice(eqIdx + 1).trim()
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1)
      }
      env[key] = val
    }
    return env
  } catch {
    return {}
  }
}

const env = loadEnv(resolve(root, ".env.local"))

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error("❌  Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const EMAIL = "vanasrenier@gmail.com"
const TEMP_PASSWORD = "JyAlweer!Admin2026"

async function run() {
  console.log(`\n🔧  Creating admin user: ${EMAIL}\n`)

  // Create user in auth.users
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: EMAIL,
    password: TEMP_PASSWORD,
    email_confirm: true,
    user_metadata: { full_name: "Renier" },
  })

  if (authError) {
    if (authError.message.includes("already been registered")) {
      console.log("⚠️   User already exists in auth — updating profile only.\n")
      // Look up existing user
      const { data: list } = await supabase.auth.admin.listUsers()
      const existing = list?.users?.find((u) => u.email === EMAIL)
      if (!existing) {
        console.error("❌  Could not find existing user.")
        process.exit(1)
      }
      await upsertProfile(existing.id)
    } else {
      console.error("❌  Auth error:", authError.message)
      process.exit(1)
    }
    return
  }

  await upsertProfile(authData.user.id)
}

async function upsertProfile(userId) {
  const { error: profileError } = await supabase.from("profiles").upsert(
    {
      id: userId,
      full_name: "Renier",
      language_preference: "af",
      is_admin: true,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  )

  if (profileError) {
    console.error("❌  Profile error:", profileError.message)
    process.exit(1)
  }

  console.log("✅  Admin user ready!\n")
  console.log(`   Email    : ${EMAIL}`)
  console.log(`   Password : ${TEMP_PASSWORD}`)
  console.log(`   Admin URL: http://localhost:3000/admin\n`)
  console.log("⚠️   Change this password after first login via the Supabase dashboard.\n")
}

run()
