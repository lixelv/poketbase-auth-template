<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Separator } from '$lib/components/ui/separator';
	import * as Card from '$lib/components/ui/card';

	import { LoaderCircle } from 'lucide-svelte';

	import { toastPost } from '$lib/utils';

	let formData = {
		username: '',
		email: '',
		password: '',
		passwordConfirm: ''
	};

	let loading = false;

	async function formAction() {
		loading = true;
		await toastPost('/api/auth/signup', formData, () => {
			window.location.href = '/';
		});
		loading = false;
	}

	async function handleGoogleLogin() {
		loading = true;
		const answer = await toastPost('/api/auth/oauth', {});

		window.location.href = answer.data.url;

		loading = false;
	}
</script>

<Card.Header>
	<Card.Title class="text-2xl">Sign up</Card.Title>
	<div>
		<Separator class="mb-3 mt-2" />
		<Card.Description>Enter username, email and password to continue.</Card.Description>
	</div>
</Card.Header>
<Card.Content>
	<form on:submit|preventDefault={formAction}>
		<div class="mb-4">
			<Input
				bind:value={formData.username}
				type="text"
				placeholder="Username"
				required
				class="w-full"
			/>
		</div>
		<div class="mb-4">
			<Input bind:value={formData.email} type="email" placeholder="Email" required class="w-full" />
		</div>
		<div class="mb-4">
			<Input
				bind:value={formData.password}
				type="password"
				placeholder="Password"
				required
				class="w-full"
			/>
		</div>
		<div class="mb-4">
			<Input
				bind:value={formData.passwordConfirm}
				type="password"
				placeholder="Confirm password"
				required
				class="w-full"
			/>
		</div>
		<Button type="submit" class="mt-4 w-full" disabled={loading}>
			{#if loading}
				<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
			{:else}
				Sign up
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
	<Button variant="outline" class="w-full" on:click={handleGoogleLogin}>
		<svg
			class="mr-2 h-4 w-4"
			aria-hidden="true"
			focusable="false"
			data-prefix="fab"
			data-icon="google"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 488 512"
		>
			<path
				fill="currentColor"
				d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
			></path>
		</svg>
		Sign up with Google
	</Button>
</Card.Content>
<Card.Footer>
	<p class="text-center text-sm">
		Have an account? <a href="/auth/login" class="text-blue-500">Login</a>
	</p>
</Card.Footer>
