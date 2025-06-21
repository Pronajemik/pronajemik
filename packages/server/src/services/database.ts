import type { Collection } from "mongodb";
import { MongoClient } from "mongodb";
import type { User } from "./user/common";

export type Database = {
	users: Collection<User>;
};

export async function createDbConnection(connectionString: string) {
	console.error("🗒️ MONGO URI at runtime:", process.env);
	const client = new MongoClient(connectionString);
	await client.connect();

	const mongoDb = client.db(process.env.DATABASE_NAME ?? "pronajemik");
	const users = mongoDb.collection<User>("users");

	const database: Database = { users };
	return database;
}
