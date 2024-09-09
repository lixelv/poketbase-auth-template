<script>
	import { post } from '$lib/utils';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<button on:click={() => post('/api/auth/logout')}>Log out</button>
