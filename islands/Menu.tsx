import { useState } from "preact/hooks";

export default function (
	{ avatar, username }: { avatar: string; username: string },
) {
	const [menuIsOpened, setMenuOpened] = useState<boolean>(false);

	if (!menuIsOpened) {
		return (
			<button onClick={() => setMenuOpened(true)}>
				<img class="w-16 h-16 rounded-full" src={avatar}></img>
			</button>
		);
	} else {
		return (
			<div>
				<div class="bg-white rounded-3xl shadow-lg px-7 py-5 space-y-4 font-babydoll relative float-right">
					<div class="space-x-5 bg-slate-400">
						<div class="grid place-items-center h-10 float-left">
							<p class="text-xl font-semibold">
								{username ?? "username"}
							</p>
						</div>
						<img
							class="rounded-full w-10 h-10 float-right"
							src={avatar}
						>
						</img>
					</div>
					<div class="grid place-items-center w-full">
						<a
							href="/api/logout"
							class="text-sm text-red-600"
						>
							Log Out
						</a>
					</div>
				</div>
			</div>
		);
	}
}
