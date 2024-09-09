import { redirect } from '@sveltejs/kit';
import { toPOJO } from '$lib/utils';

export const load = async ({ locals, url }) => {
	if (!locals.user) {
		if (!url.pathname.includes('/auth/')) {
			throw redirect(302, '/auth/login');
		}
		return {
			user: undefined
		};
	} else {
		return {
			user: toPOJO(locals.user)
		};
	}
};
