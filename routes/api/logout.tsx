import { helpers } from "../../utils.ts";
import { deleteCookie, STATUS_CODE } from "@std/http";

export const handler = helpers.defineHandlers({
	GET(_ctx) {
		const headers = new Headers();

		headers.set("location", "/");
		deleteCookie(headers, "token", { path: "/" });

		console.log(headers);

		return new Response(null, {
			headers,
			status: STATUS_CODE.Found,
		});
	},
});
