<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { browser } from '$app/environment';

	if (browser) {
		window.location.href = '/';
	}
</script>

<Card.Header class="flex flex-row items-center justify-between text-xl text-border">
	<span>Redirecting...</span>
</Card.Header>
