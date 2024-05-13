import { API } from "@djs/core";
import { REST } from "@djs/rest";

import { createHelpers } from "@fresh/core";

// deno-lint-ignore no-empty-interface
export interface State {}

export function createAPI(
	token?: string,
	authPrefix: "Bearer" | "Bot" = "Bot",
): API {
	let rest: REST;
	if (!token) {
		rest = new REST();
	} else {
		rest = new REST({ authPrefix }).setToken(token);
	}

	return new API(rest);
}
export const helpers = createHelpers<State>();
export const kv = await Deno.openKv();
