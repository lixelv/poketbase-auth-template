import { toPOJO } from '$lib/utils.js';

export const load = async ({ locals }) => {
	return { user: toPOJO(locals.user) };
};
