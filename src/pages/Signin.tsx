import { useCallback } from "react";
import { createForm, useForm } from "effector-forms";
import styled from "styled-components";

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

const Container = styled.div`
	width: 100%;
	display: flex;
	min-height: 100vh;
	align-items: center;
	justify-content: center;

	input {
		width: calc(100% - 2.4em);
		margin-top: 0.8rem;
	}
`;

const SubmitButton = styled.button`
	width: 100%;
	margin-top: 2rem;
`;

export const Signin: React.FC = () => {
	const form = useForm(authForm);
	const navigate = useNavigate();

	const handleFormSubmit = useCallback(async (event: React.FormEvent) => {
		event.preventDefault();

		try {
			await authService.signin(authForm.$values.getState());
			navigate("/login");
		} catch (error) {
			alert("Ошибка регистрации");
		}
	}, []);

	return (
		<Container>
			<div>
				<AuthNavigation />
				<form onSubmit={handleFormSubmit}>
					<div>
						<input
							{...bindField(form.fields.login)}
							placeholder='Логин'
							required
							pattern='^[A-Za-z0-9_]+$'
						/>
					</div>
					<div>
						<input {...bindField(form.fields.password)} placeholder='Пароль' required />
					</div>
					<div>
						<input
							{...bindField(form.fields.firstName)}
							placeholder='Имя'
							required
							pattern='^[A-Za-zА-Яа-я ]+$'
						/>
					</div>
					<div>
						<input
							{...bindField(form.fields.secondName)}
							placeholder='Фамилия'
							required
							pattern='^[A-Za-zА-Яа-я ]+$'
						/>
					</div>
					<div>
						<input
							{...bindField(form.fields.middleName)}
							placeholder='Отчество'
							required
							pattern='^[A-Za-zА-Яа-я ]+$'
						/>
					</div>
					<SubmitButton type='submit'>Зарегистрироваться</SubmitButton>
				</form>
			</div>
		</Container>
	);
};
