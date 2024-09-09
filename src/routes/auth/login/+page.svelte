<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Separator } from '$lib/components/ui/separator';
	import * as Card from '$lib/components/ui/card';
	import { LoaderCircle } from 'lucide-svelte';
	import { toastPost } from '$lib/utils';
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

	export let data: { providers: any };

	let formData = {
		login: '',
		password: ''
	};

	let loading = false;

	async function formAction() {
		loading = true;
		await toastPost('/api/auth/login', formData, () => {
			window.location.href = '/';
		});
		loading = false;
	}

	async function Oauth2Login(provider: string) {
		loading = true;

		const answer = await toastPost('/api/auth/oauth', { provider });
		window.location.href = answer.data.url;

		loading = false;
	}
</script>

<Card.Header>
	<Card.Title class="text-2xl">Login</Card.Title>
	<div>
		<Separator class="mb-3 mt-2" />
		<Card.Description>Enter your email below to login to your account.</Card.Description>
	</div>
</Card.Header>
<Card.Content>
	<form on:submit|preventDefault={formAction} class="space-y-4">
		<Input
			bind:value={formData.login}
			type="text"
			placeholder="Username or email"
			required
			class="w-full"
		/>
		<Input
			bind:value={formData.password}
			type="password"
			placeholder="Password"
			required
			class="w-full"
		/>
		<Button type="submit" class="w-full" disabled={loading}>
			{#if loading}
				<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
			{:else}
				Login
			{/if}
		</Button>
	</form>
	<div class="relative my-4">
		<div class="absolute inset-0 flex items-center">
			<span class="w-full border-t" />
		</div>
		<div class="relative flex justify-center text-xs uppercase">
			<span class="bg-background px-2 text-muted-foreground">Or continue with</span>
		</div>
	</div>
	<div class="mt-4 flex flex-col space-y-4">
		{#each data.providers as provider}
			<Button variant="outline" class="relative w-full" on:click={() => Oauth2Login(provider.name)}>
				<img
					src="{PUBLIC_POCKETBASE_URL}/_/images/oauth2/{provider.name}.svg"
					class="mr-2 h-full brightness-0 invert"
					alt="{provider.displayName} logo"
				/>

				Login with {provider.displayName}
			</Button>
		{/each}
	</div>
</Card.Content>
<Card.Footer>
	<div class="flex w-full items-center justify-between">
		<p class="text-center text-sm">
			Don't have an account? <a href="/auth/signup" class="text-blue-500">Sign up</a>
		</p>
		<p class="text-center text-sm">
			<a href="/auth/forgot" class="text-foreground/40">Forgot password?</a>
		</p>
	</div>
</Card.Footer>
