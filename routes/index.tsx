import { getCookies } from "@std/http";
import { helpers } from "../utils.ts";

export const handler = helpers.defineHandlers({
	async POST(ctx) {
		const data = await ctx.req.formData();
		const cookies = getCookies(ctx.req.headers);

		return {
			data: {
				code: data.get("code") as string,
			},
		};
	},
	GET(_ctx) {
		return { data: { code: "test" } };
	},
});

export default helpers.definePage<typeof handler>((ctx) => {
	return (
		<div class="w-dvw h-dvh bg-white p-8 font-babydoll">
			<div class="h-full w-full grid place-items-center">
				<div class="bg-white w-80 shadow-xl rounded-xl overflow-hidden">
					<img class="pointer-events-none" src="/sashimi.jpg">
					</img>
					<div class="bg-white p-6 space-y-3">
						<div class="select-none space-y-1">
							<p class="text-2xl font-semibold">Welcome!!</p>
							<p class="text-gray-600 text-sm">
								Sebelum bergabung, verifikasi akun kamu terlebih
								dahulu ya! {">~<"}
							</p>
						</div>
						<form method="POST" action="/">
							<input
								type="text"
								name="code"
								class="bg-gray-200 text-center rounded-lg w-full h-10"
								placeholder="kitsunee"
								value={ctx.data.code ?? ""}
							>
							</input>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
});
