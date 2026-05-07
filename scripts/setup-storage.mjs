import { createClient } from "@supabase/supabase-js"
import { readFileSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, "..")

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

async function ensureBucket(name) {
  const { data: existing } = await supabase.storage.getBucket(name)
  if (existing) {
    console.log(`✓  Bucket '${name}' already exists`)
    return
  }
  const { error } = await supabase.storage.createBucket(name, { public: true, fileSizeLimit: 10485760 })
  if (error) {
    console.error(`❌  Failed to create bucket '${name}':`, error.message)
  } else {
    console.log(`✅  Created public bucket '${name}'`)
  }
}

async function run() {
  console.log("\n🪣  Setting up Supabase Storage buckets...\n")
  await ensureBucket("images")
  console.log("\n✅  Storage setup complete. Bucket: images (public, 10 MB file limit)\n")
}

run()
