import { helpers } from "../../utils.ts";

import Menu from "../../islands/Menu.tsx";

export default helpers.definePage(() => {
	return (
		<div class="grid place-items-center w-dvw h-dvh">
			<Menu avatar="" username="username"></Menu>
		</div>
	);
});
