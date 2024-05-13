import { type FreshContext } from "@fresh/core";
import { type ComponentType } from "preact";

export default function App(
	{ Component }: FreshContext & { Component: ComponentType<unknown> },
) {
	return (
		<html>
			<head>
				<meta charset="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<title>src</title>
				<link rel="stylesheet" href="/styles.css" />
			</head>
			<body>
				<Component />
			</body>
		</html>
	);
}
