import { redirect } from '@sveltejs/kit';
import { toPOJO } from '$lib/utils';

export const load = async ({ locals, url }) => {
	const user = locals.user;

	if (!user && !url.pathname.startsWith('/auth/')) {
		throw redirect(302, '/auth/login');
	}

	return { user: toPOJO(user) };
};
