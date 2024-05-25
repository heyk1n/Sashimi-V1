import { page } from "@fresh/core";
import { getCookies } from "@std/http";
import { type ComponentChildren } from "preact";
import { authorizeUrl, createAPI, define, kv } from "../utils.ts";
import { decodeBase64 } from "@std/encoding/base64";

import Menu from "../islands/Menu.tsx";

export const handler = define.handlers({
	async POST(ctx) {
		const data = await ctx.req.formData();
		const cookies = getCookies(ctx.req.headers);

		return page({
			code: data.get("code") as string,
			user: {
				avatar: cookies["avatar"],
				username: cookies["username"],
			},
		});
	},
	GET(ctx) {
		const token = getCookies(ctx.req.headers)["token"];

		if (!token) {
			return page({ code: null, user: null });
		} else {
			const user = getCookies(ctx.req.headers)["user"];

			return page({
				code: null,
				user: JSON.parse(
					new TextDecoder().decode(decodeBase64(user).buffer),
				),
			});
		}
	},
});

export default define.page<typeof handler>(({ data }) => {
	const { code, user } = data;
	return (
		<div class="w-dvw h-dvh bg-white font-babydoll">
			<div class="h-full w-full relative">
				<div class="w-full h-full grid place-items-center absolute">
					<div class="bg-white w-80 shadow-xl rounded-xl overflow-hidden">
						<img class="pointer-events-none" src="/sashimi.jpg">
						</img>
						<div class="bg-white p-6 space-y-3">
							<div class="select-none space-y-1 grid place-items-center text-center">
								<p class="text-2xl font-semibold">
									Welcome!!
								</p>
								<p class="text-gray-600 text-sm">
									Sebelum bergabung, verifikasi akun kamu
									terlebih dahulu ya! {">~<"}
								</p>
							</div>
							{user
								? (
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
								)
								: (
									<div class="w-full grid place-items-center">
										<a href={authorizeUrl.toString()}>
											<p class="bg-yellow-200 px-4 py-2 rounded-full select-none">
												Login with Discord
											</p>
										</a>
									</div>
								)}
						</div>
					</div>
				</div>
				{user && (
					<div class="absolute top-8 right-8">
						<Menu
							avatar={user.avatar}
							username={user.username}
						>
						</Menu>
					</div>
				)}
			</div>
		</div>
	);
});
