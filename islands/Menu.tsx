import { useState } from "preact/hooks";
import { asset } from "@fresh/core/client";

export default function (
	{ avatar, username }: { avatar: string; username: string },
) {
	const [menuIsOpened, setMenuOpened] = useState<boolean>(false);

	if (!menuIsOpened) {
		return (
			<button onClick={() => setMenuOpened(true)}>
				<img
					class="w-12 h-12 rounded-full pointer-events-none"
					src={avatar}
				>
				</img>
			</button>
		);
	} else {
		return (
			<div class="flex space-x-3">
				<button
					class="grid bg-white w-10 h-10 rounded-full shadow-xl place-self-center"
					onClick={() => setMenuOpened(false)}
				>
					<img
						class="w-4 h-4 place-self-center pointer-events-none"
						src="/close.png"
					>
					</img>
				</button>
				<div class="bg-white rounded-2xl shadow-lg p-4 min-w-56 font-babydoll space-y-2">
					<div class="flex space-x-4 place-content-center select-none">
						<img
							class="w-12 h-12 rounded-full pointer-events-none"
							src={avatar}
						>
						</img>
						<div>
							<p>Logged in as</p>
							<p class="text-lg font-semibold">{username}</p>
						</div>
					</div>
					<div class="grid w-full">
						<a href="/api/logout" class="place-self-center">
							<p class="text-red-500">Log Out</p>
						</a>
					</div>
				</div>
			</div>
		);
	}
}
