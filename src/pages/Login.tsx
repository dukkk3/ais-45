import { useCallback } from "react";
import { createForm, useForm } from "effector-forms";

import { createEffect } from "effector";

import { $authToken, actions } from "../core/session";
import { authService } from "../core/services";
import { bindField } from "../core/helpers";

import { AuthNavigation } from "./AuthNavigation";

const authForm = createForm({
	fields: {
		login: {
			init: "",
		},
		password: {
			init: "",
		},
	},
});

export const Login: React.FC = () => {
	const form = useForm(authForm);

	const handleFormSubmit = useCallback(async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			const {
				data: {
					data: { token },
				},
			} = await authService.login(authForm.$values.getState());
			actions.setAuthToken(token);
		} catch (error) {
			alert("Ошибка авторизации");
		}
	}, []);

	return (
		<>
			<AuthNavigation />
			<form onSubmit={handleFormSubmit}>
				<div>
					<input {...bindField(form.fields.login)} placeholder='Логин' required />
				</div>
				<div>
					<input {...bindField(form.fields.password)} placeholder='Пароль' required />
				</div>
				<button type='submit'>Войти</button>
			</form>
		</>
	);
};
