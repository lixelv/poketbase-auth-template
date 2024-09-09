import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, cookies }) => {
	if (locals.pb.authStore.isValid) {
		throw redirect(302, '/');
	} else {
		return {};
	}
};
