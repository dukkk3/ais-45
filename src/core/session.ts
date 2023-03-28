import { createEffect, createEvent, createStore, sample } from "effector";

const localStorage = window.localStorage;
const setAuthToken = createEvent<string>();

const updateLocalStorageToken = createEffect((token: string) => {
	localStorage.setItem("token", token);
});

export const $authToken = createStore(localStorage.getItem("token") || "").on(
	setAuthToken,
	(_, token) => token
);

sample({
	clock: setAuthToken,
	target: updateLocalStorageToken,
});

export const actions = {
	setAuthToken,
};
