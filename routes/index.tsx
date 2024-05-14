import { getCookies } from "@std/http";
import { createAPI, helpers, kv } from "../utils.ts";

import Menu from "../islands/Menu.tsx";

export const handler = helpers.defineHandlers({
	async POST(ctx) {
		const data = await ctx.req.formData();
		const cookies = getCookies(ctx.req.headers);

		return {
			data: {
				code: data.get("code") as string,
				user: {
					avatar: cookies["avatar"],
					username: cookies["username"],
				},
			},
		};
	},
	async GET(ctx) {
		const token = getCookies(ctx.req.headers)["token"];

		if (!token) {
			return {
				data: {},
			};
		} else {
			const { value: accessToken } = await kv.get<string>([
				"tokens",
				token,
			]);
			const api = createAPI(accessToken!, "Bearer");

			const member = await api.users.getGuildMember(
				Deno.env.get("DISCORD_GUILD_ID")!,
			);

			const avatar = member.user!.avatar
				? api.rest.cdn.avatar(member.user!.id, member.user!.avatar)
				: api.rest.cdn.defaultAvatar(
					Number((BigInt(member.user!.id) / 22n) % 6n),
				);

			return {
				data: {
					code: null,
					user: {
						avatar,
						username: member.user!.username,
					},
				},
			};
		}
	},
});

export default helpers.definePage<typeof handler>(({ data }) => {
	const { code, user } = data;
	if (!user) {
		return <p>You're not logged in</p>;
	} else {return (
			<div class="w-dvw h-dvh bg-white p-8 font-babydoll">
				<div class="h-full w-full relative">
					<div class="w-full h-full grid place-items-center absolute">
						<div class="bg-white w-80 shadow-xl rounded-xl overflow-hidden">
							<img class="pointer-events-none" src="/sashimi.jpg">
							</img>
							<div class="bg-white p-6 space-y-3">
								<div class="select-none space-y-1">
									<p class="text-2xl font-semibold">
										Welcome!!
									</p>
									<p class="text-gray-600 text-sm">
										Sebelum bergabung, verifikasi akun kamu
										terlebih dahulu ya! {">~<"}
									</p>
								</div>
								<form method="POST" action="/">
									<input
										type="text"
										name="code"
										class="bg-gray-200 text-center rounded-lg w-full h-10"
										placeholder="kitsunee"
										value={code ?? ""}
									>
									</input>
								</form>
							</div>
						</div>
					</div>
					<div class="absolute top-0 right-0">
						<Menu
							avatar={user.avatar}
							username={user.username}
						>
						</Menu>
					</div>
				</div>
			</div>
		);}
});
