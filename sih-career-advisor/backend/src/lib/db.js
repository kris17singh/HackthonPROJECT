// backend/src/lib/db.js
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import path from 'path'
import { fileURLToPath } from 'url'
import { nanoid } from 'nanoid'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dbPath = path.resolve(__dirname, '../../db.json')

export let db = null

export async function initializeDatabase() {
  const adapter = new JSONFile(dbPath)
  db = new Low(adapter, {
    users: [],
    dashboards: [],
    chats: [],
    mentors: [],
    resumes: [],
    interviews: [],
    appointments: []
  })

  await db.read()

  // Ensure defaults if db.json is empty
  db.data ||= {
    users: [],
    dashboards: [],
    chats: [],
    mentors: [],
    resumes: [],
    interviews: [],
    appointments: []
  }

  // seed demo mentor list if empty
  if (!db.data.mentors || db.data.mentors.length === 0) {
    db.data.mentors = [
      { id: nanoid(), name: 'Anita Sharma', domain: 'Software', yearsExperience: 8 },
      { id: nanoid(), name: 'Rahul Mehta', domain: 'Data Science', yearsExperience: 6 },
      { id: nanoid(), name: 'Priya Nair', domain: 'Electrical', yearsExperience: 10 }
    ]
    await db.write()
  }
}
