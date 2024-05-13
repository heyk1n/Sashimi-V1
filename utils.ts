import { API } from "@djs/core";
import { REST } from "@djs/rest";

import { createHelpers } from "@fresh/core";

// deno-lint-ignore no-empty-interface
export interface State {}

export function createAPI(
	token: string,
	authPrefix: "Bearer" | "Bot" = "Bot",
): API {
	return new API(new REST({ authPrefix }).setToken(token));
}
export const helpers = createHelpers<State>();
export const kv = await Deno.openKv();
