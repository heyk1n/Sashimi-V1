import { type RouteConfig } from "@fresh/core";

import { encodeBase64 } from "@std/encoding/base64";
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

			const api = createAPI(Deno.env.get("DISCORD_TOKEN")!);

			const { access_token } = await api.oauth2.tokenExchange({
				client_id: Deno.env.get("DISCORD_CLIENT_ID")!,
				client_secret: Deno.env.get("DISCORD_CLIENT_SECRET")!,
				code,
				grant_type: "authorization_code",
				redirect_uri: Deno.env.get("DISCORD_REDIRECT_URI")!,
			});

			const userAPI = createAPI(access_token, "Bearer");
			const { avatar, username, id } = await userAPI.users.getCurrent();

			const headers = new Headers();

			headers.set("location", "/");

			setCookie(headers, {
				name: "token",
				value: token,
				maxAge: expire,
				path: "/",
			});

			const encoded = encodeBase64(JSON.stringify({
				avatar: avatar
					? userAPI.rest.cdn.avatar(id, avatar)
					: api.rest.cdn.defaultAvatar(
						Number((BigInt(id) / 22n) % 6n),
					),
				username,
			}));

			setCookie(headers, {
				name: "user",
				value: encoded,
				maxAge: expire,
				path: "/",
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
