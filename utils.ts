import { API, OAuth2Routes, OAuth2Scopes } from "@djs/core";
import { REST } from "@djs/rest";

import { createDefine } from "@fresh/core";

// deno-lint-ignore no-empty-interface
export interface State {}

export function createAPI(
	token: string,
	authPrefix: "Bearer" | "Bot" = "Bot",
): API {
	return new API(new REST({ authPrefix }).setToken(token));
}
export const define = createDefine<State>();
export const kv = await Deno.openKv();

export const authorizeUrl = new URL(OAuth2Routes.authorizationURL);
const scopes = [
	OAuth2Scopes.GuildsMembersRead,
	OAuth2Scopes.Identify,
];

authorizeUrl.searchParams.set(
	"client_id",
	Deno.env.get("DISCORD_CLIENT_ID")!,
);
authorizeUrl.searchParams.set("response_type", "code");
authorizeUrl.searchParams.set(
	"redirect_uri",
	Deno.env.get("DISCORD_REDIRECT_URI")!,
);
authorizeUrl.searchParams.set("scope", scopes.join(" "));
