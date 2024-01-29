<script>
	import '../app.pcss';
	import * as Avatar from "$lib/components/ui/avatar";
	import * as Popover from "$lib/components/ui/popover";
</script>
<nav class="bg-grey-800 shadow">
	<div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
		<div class="relative flex h-16 items-center justify-between">
			<!-- Mobile menu button-->
			<button type="button" class="mobile-menu-button" aria-controls="mobile-menu" aria-expanded="false">
				<span class="sr-only">Open main menu</span>
				<!-- Icon when menu is closed. Menu open: "hidden", Menu closed: "block" -->
				<svg class="menu-closed-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
				</svg>
				<!-- Icon when menu is open. Menu open: "block", Menu closed: "hidden" -->
				<svg class="menu-open-icon hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
			<div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
				<div class="flex flex-shrink-0 items-center">
					<img class="logo" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company">
				</div>
				<div class="hidden sm:ml-6 sm:block">
					<div class="flex space-x-4">
						<!-- Navigation links -->
						<a href="#" class="nav-link active" aria-current="page">Home</a>
						<a href="#" class="nav-link">About</a>
						<a href="#" class="nav-link">History</a>
						<a href="/Login" class="nav-link">Login</a>
					</div>
				</div>
			</div>
			<div class="notifications-profile-container">
				<button type="button" class="notifications-button">
					<span class="sr-only">View notifications</span>
					<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
					</svg>
				</button>
				<!-- Profile dropdown -->
				<Popover.Root>
					<Popover.Trigger>
						<Avatar.Root>
							<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
							<Avatar.Fallback>CN</Avatar.Fallback>
						</Avatar.Root>
					</Popover.Trigger>
					<Popover.Content>
						<a href="/Profile" class="dropdown-item">Profile</a>
						<a href="/Profile/DataForm" class="dropdown-item">Settings</a>
						<a href="#" class="dropdown-item">Sign out</a>
					</Popover.Content>
				</Popover.Root>
			</div>
		</div>
	</div>
	<!-- Mobile menu, show/hide based on menu state. -->
	<div class="mobile-menu" id="mobile-menu">
		<div class="mobile-menu-items">
			<a href="#" class="mobile-menu-item active" aria-current="page">Home</a>
			<a href="#" class="mobile-menu-item">About</a>
			<a href="#" class="mobile-menu-item">History</a>
			<a href="#" class="mobile-menu-item">Login</a>
		</div>
	</div>
</nav>

<slot />

