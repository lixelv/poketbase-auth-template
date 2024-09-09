import { answer } from '$lib/utils.js';

export const POST = async ({ locals, cookies }) => {
	locals.pb.authStore.clear();
	cookies.delete('slug', { path: '/' });
	cookies.delete('oauth_state', { path: '/' });
	cookies.delete('oauth_verifier', { path: '/' });
	locals.user = undefined;

	return answer({ code: 200, message: 'Logged out successfully' }, 200);
};
