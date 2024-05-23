import { App, fsRoutes, staticFiles } from "@fresh/core";
import { type State } from "./utils.ts";

export const app = new App<State>()
	.use(staticFiles());

await fsRoutes(app, {
	dir: Deno.cwd(),
	loadIsland: (path) => import("./islands/" + path),
	loadRoute: (path) => import("./routes/" + path),
});

if (import.meta.main) {
	await app.listen();
}
