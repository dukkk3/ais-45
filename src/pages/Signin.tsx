import { useCallback } from "react";
import { createForm, useForm } from "effector-forms";

import { authService } from "../core/services";
import { bindField } from "../core/helpers";
import { useNavigate } from "react-router";

import { AuthNavigation } from "./AuthNavigation";

const authForm = createForm({
	fields: {
		login: {
			init: "",
		},
		password: {
			init: "",
		},
		firstName: {
			init: "",
		},
		secondName: {
			init: "",
		},
		middleName: {
			init: "",
		},
	},
});

export const Signin: React.FC = () => {
	const form = useForm(authForm);
	const navigate = useNavigate();

	const handleFormSubmit = useCallback(async (event: React.FormEvent) => {
		event.preventDefault();
		await authService.signin(authForm.$values.getState());
		navigate("/login");
	}, []);

	return (
		<>
			<AuthNavigation />
			<form onSubmit={handleFormSubmit}>
				<div>
					<input {...bindField(form.fields.login)} placeholder='Логин' />
				</div>
				<div>
					<input {...bindField(form.fields.password)} placeholder='Пароль' />
				</div>
				<div>
					<input {...bindField(form.fields.firstName)} placeholder='Имя' />
				</div>
				<div>
					<input {...bindField(form.fields.secondName)} placeholder='Фамилия' />
				</div>
				<div>
					<input {...bindField(form.fields.middleName)} placeholder='Отчество' />
				</div>
				<button type='submit'>Зарегистрироваться</button>
			</form>
		</>
	);
};
