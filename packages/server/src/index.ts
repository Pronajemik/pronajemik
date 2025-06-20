import { Elysia } from "elysia";

import { RequireBase } from "./middlewares/base.js";
import { RequireErrorFallback } from "./middlewares/fallback.js";
import { LoginRoute } from "./routes/login.js";
import { RegisterRoute } from "./routes/register.js";

const app = new Elysia()
	.use(RequireBase)
	// Public
	.use(LoginRoute)
	.use(RegisterRoute)
	// Private
	//
	.use(RequireErrorFallback)
	.listen(process.env.PORT || 8080);

console.log(
	`🏠 Pronajemik API is running at http://${app.server?.hostname}:${app.server?.port}`,
);
