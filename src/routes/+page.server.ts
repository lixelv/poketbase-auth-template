import { toPOJO } from '$lib/utils.js';

export const load = async ({ locals }) => {
	if (!locals.user) {
		return {
			user: undefined
		};
	} else {
		return {
			user: toPOJO(locals.user)
		};
	}
};
