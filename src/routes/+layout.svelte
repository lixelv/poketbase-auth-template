<script>
	import '../app.css';
	import { theme } from 'theme-selector';
	import { Toaster } from '$lib/components/ui/sonner';
</script>

<Toaster richColors theme={$theme} />
<slot />
