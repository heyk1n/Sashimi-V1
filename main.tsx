import { App, fsRoutes, staticFiles } from "@fresh/core";
import { State } from "./utils.ts";

export const app = new App<State>()
	.use(staticFiles())
	.get("/api/:joke", () => new Response("Hello World"))
	.get("/greet/:name", (ctx) => {
		return ctx.render(<h1>Hello {ctx.params.name}</h1>);
	});

await fsRoutes(app, {
	dir: Deno.cwd(),
	loadIsland: (path) => import("./islands/" + path),
	loadRoute: (path) => import("./routes/" + path),
});

if (import.meta.main) {
	await app.listen();
}
