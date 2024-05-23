import { useState } from "preact/hooks";

export default function (
	{ avatar, username }: { avatar: string; username: string },
) {
	const [menuIsOpened, setMenuOpened] = useState<boolean>(false);

	if (!menuIsOpened) {
		return (
			<button onClick={() => setMenuOpened(true)}>
				<img class="w-12 h-12 rounded-full" src={avatar}></img>
			</button>
		);
	} else {
		return (
			<div class="flex space-x-6">
				<button
					class="bg-white w-10 h-10 rounded-full shadow-xl place-self-center"
					onClick={() => setMenuOpened(false)}
				>
				</button>
				<div class="bg-white rounded-2xl shadow-lg p-4 min-w-56 font-babydoll space-y-2">
					<div class="flex space-x-4 place-content-center">
						<img class="w-12 h-12 rounded-full" src={avatar}></img>
						<div>
							<p>Logged in as</p>
							<p class="text-lg font-semibold">{username}</p>
						</div>
						<a href="/api/logout" class="place-self-center">
							<p class="text-red-500">Log Out</p>
						</a>
					</div>
				</div>
			</div>
		);
	}
}
