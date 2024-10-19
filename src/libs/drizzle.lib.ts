import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

    const client = postgres(Bun.env.DATABASE_URL_DRIZZLE as string) 
    const db = drizzle(client);

export default db

