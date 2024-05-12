const response = await fetch(
	"https://raw.githubusercontent.com/heyk1n/sashimi-oauth-test/prod/src/static/babydoll.ttf",
);
await Deno.writeFile(
	"static/babydoll.ttf",
	new Uint8Array(await response.arrayBuffer()),
);
