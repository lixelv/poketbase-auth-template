import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, url, cookies }) => {
	const redirectUrl = `${url.origin}/auth/oauth`;
	const expectedState = cookies.get('oauth_state');
	const expectedVerifier = cookies.get('oauth_verifier');
	const selectedProvider = cookies.get('provider');

	const state = decodeURI(url.searchParams.get('state') || '');
	const code = decodeURI(url.searchParams.get('code') || '');

	const authMethods = await locals.pb.collection('users').listAuthMethods();
	const currentAuthProvider = authMethods.authProviders.find(
		(provider) => provider.name === selectedProvider
	);

	if (!currentAuthProvider) {
		console.log('No auth providers');
		throw redirect(302, '/auth/login');
	}

	if (state !== expectedState) {
		console.log('Invalid state', state, expectedState);
		throw redirect(302, '/auth/login');
	}

	try {
		await locals.pb
			.collection('users')
			.authWithOAuth2Code(
				currentAuthProvider.name,
				code as string,
				expectedVerifier as string,
				redirectUrl,
				{
					name: 'currentBody'
				}
			);

		cookies.delete('provider', { path: '/' });
		cookies.delete('oauth_state', { path: '/' });
		cookies.delete('oauth_verifier', { path: '/' });
	} catch (err) {
		console.log('Fuck!', err);
	}
};
