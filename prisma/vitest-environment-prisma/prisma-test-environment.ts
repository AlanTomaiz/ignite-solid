import 'dotenv/config'

import { PrismaClient } from '@prisma/client'
import { execSync } from 'node:child_process'
import { Environment } from 'vitest'

const prisma = new PrismaClient()

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const databaseURL = new URL(process.env.DATABASE_URL)
  databaseURL.searchParams.set('schema', schema)

  return databaseURL.toString()
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    const schema = new Date().getTime().toString()
    const databaseURL = generateDatabaseURL(schema)
    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(`
          DROP SCHEMA IF EXISTS "${schema}" CASCADE
        `)

        await prisma.$disconnect()
      },
    }
  },
}
