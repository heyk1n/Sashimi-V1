import { setCookie, STATUS_CODE } from "@std/http";
import { createAPI, helpers, kv } from "../../utils.ts";

export const handler = helpers.defineHandlers({
	async GET(ctx) {
		const code = ctx.url.searchParams.get("code");

		if (!code) {
			return new Response("Invalid request.", {
				status: STATUS_CODE.NotFound,
			});
		} else {
			const token = `sashimi_${crypto.randomUUID()}`;
			const expire = 3_600;

			const api = createAPI();

			const { access_token } = await api.oauth2.tokenExchange({
				client_id: Deno.env.get("DISCORD_CLIENT_ID")!,
				client_secret: Deno.env.get("DISCORD_CLIENT_SECRET")!,
				code,
				grant_type: "authorization_code",
				redirect_uri: Deno.env.get("DISCORD_REDIRECT_URI")!,
			});

			const headers = new Headers();
			setCookie(headers, {
				name: "token",
				value: token,
				maxAge: expire,
			});

			await kv.set(["tokens", token], access_token, {
				expireIn: expire * 1_000,
			});

			return new Response(null, {
				headers,
				status: STATUS_CODE.Found,
			});
		}
	},
});
