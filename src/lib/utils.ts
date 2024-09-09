import { type ClassValue, clsx } from 'clsx';
import { toast } from 'svelte-sonner';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

export const answer = (data: any, status = 200) => {
	return new Response(JSON.stringify(data), {
		headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
		status: status
	});
};

export type CheckPasswordAnswer =
	| { success: true; error: undefined }
	| { success: false; error: string };

export const checkPassword = (
	password: string,
	passwordConfirm: string | undefined = undefined
): CheckPasswordAnswer => {
	passwordConfirm = passwordConfirm || password;

	if (password !== passwordConfirm) {
		return { success: false, error: 'Passwords do not match' };
	} else if (password.length < 8) {
		return { success: false, error: 'Password must be at least 8 characters' };
	} else if (password.match(/^\d+$/)) {
		return { success: false, error: 'Password must contain letters' };
	} else if (password !== password.trim()) {
		return { success: false, error: 'Password must not contain leading or trailing spaces' };
	} else if (password == password.toLowerCase()) {
		return { success: false, error: 'Password must contain at least one lowercase letter' };
	} else if (password == password.toUpperCase()) {
		return { success: false, error: 'Password must contain at least one uppercase letter' };
	} else {
		return { success: true, error: undefined };
	}
};

export const toastPost = async (
	url: string,
	data: any = {},
	onSuccess: () => void = () => {},
	onError: () => void = () => {}
) => {
	const response = await post(url, data);

	if (response.status >= 300) {
		onError();
		toast.error(response.data.message);
	} else {
		onSuccess();
		toast.success(response.data.message);
	}

	return response;
};

export const post = async (url: string, data: any = {}) => {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'include',
		body: JSON.stringify(data)
	});

	return { status: response.status, data: await response.json() };
};

export const toPOJO = (obj: any) => {
	return JSON.parse(JSON.stringify(obj));
};

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};
