import { useState } from "preact/hooks";

export default function (
	{ avatar, username }: { avatar: string; username: string },
) {
	const [menuIsOpened, setOpenMenu] = useState<boolean>(false);

	return (
		<button>
			<img class="w-16 h-16 rounded-full" src={avatar}></img>
		</button>
	);
}
