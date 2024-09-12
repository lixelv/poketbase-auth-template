import { admin } from '$lib/pocketbase/server';
import { createPb } from '$lib/pocketbase';
import { toPOJO } from '$lib/utils';
import type { Handle } from '@sveltejs/kit';
import type { UsersResponse } from '$lib/types';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.admin = admin;

	if (!event.locals.pb) {
		event.locals.pb = createPb();
	}

	await event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	if (event.locals.pb.authStore.isValid) {
		event.locals.user = toPOJO(event.locals.pb.authStore.model as UsersResponse);
	} else {
		event.locals.user = undefined;
	}

	// console.log('Endpoint', event.request.url);
	// console.log('Before', event.locals.pb.authStore.model);

	const response = await resolve(event);

	// console.log('After', event.locals.pb.authStore.model);

	response.headers.append(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({ httpOnly: false, secure: false })
	);

	// console.log('Cookies', event.locals.pb.authStore.exportToCookie());

	// console.log('Real cookies', response.headers.get('set-cookie'));

	return response;
};
