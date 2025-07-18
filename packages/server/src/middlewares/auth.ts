import { Elysia } from "elysia";
import { getUser } from "../services/user/get.js";
import { RequireBase } from "./base.js";

export const RequireAuth = new Elysia({ name: "Middleware.Auth" })
	.use(RequireBase)
	.derive(async ({ database, jwt, headers }) => {
		const token = headers.authorization;
		const data = await jwt.verify(token);
		if (!data) {
			throw new Error("Unauthorized");
		}
		const response = await getUser({ database, userId: data.userId });
		if (!response.ok) {
			throw new Error("Unauthorized");
		}
		return { user: response.data };
	})
	.as("scoped");
