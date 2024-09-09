<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	import { Sun, Moon, Bolt } from 'lucide-svelte';

	import { theme } from 'theme-selector';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="outline" builders={[builder]} class="absolute right-4 top-4" size="icon">
			{#if $theme === 'dark'}
				<Moon class="h-6 w-6" />
			{:else if $theme === 'light'}
				<Sun class="h-6 w-6" />
			{/if}
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Label>Theme</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.Item on:click={() => theme.set('light')}>
				<Sun class="mr-2 h-4 w-4" />
				<span>Light</span>
			</DropdownMenu.Item>
			<DropdownMenu.Item on:click={() => theme.set('dark')}>
				<Moon class="mr-2 h-4 w-4" />
				<span>Dark</span>
			</DropdownMenu.Item>
			<DropdownMenu.Item on:click={() => theme.set('system')}>
				<Bolt class="mr-2 h-4 w-4" />
				<span>System</span>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
<div class="flex h-[100vh]">
	<div class="container m-auto max-w-md">
		<Card.Root class="my-6">
			<slot />
		</Card.Root>
	</div>
</div>
