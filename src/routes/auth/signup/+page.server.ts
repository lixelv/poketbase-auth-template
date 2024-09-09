export const load = async ({ locals }) => {
	const methods = (await locals.pb.collection('users').listAuthMethods()).authProviders;

	return {
		providers: methods
	};
};
