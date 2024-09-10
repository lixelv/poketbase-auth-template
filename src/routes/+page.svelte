<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';

	import { post } from '$lib/utils';
	import { browser } from '$app/environment';

	export let data: { user: any };
</script>

<div class="flex h-[100vh]">
	<div class="container m-auto max-w-md">
		<Card.Root>
			<Card.Header class="flex flex-row justify-between">
				<div class="flex flex-col">
					<Card.Title>{data.user?.username}</Card.Title>
					<Card.Description>{data.user?.email}</Card.Description>
				</div>
				<Button
					on:click={async () => {
						await post('/api/auth/logout');
						window.location.reload();
					}}>Log out</Button
				>
			</Card.Header>
		</Card.Root>
	</div>
</div>
