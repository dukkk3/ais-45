import { useCallback } from "react";
import { createForm, useForm } from "effector-forms";

import { actions } from "../../core/session";
import { authService } from "../../core/services";
import { bindField } from "../../core/helpers";

import { AuthNavigation } from "../AuthNavigation";

import * as S from "./styled";
import styled from "styled-components";

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

const SubmitButton = styled.button`
	width: 100%;
	margin-top: 2rem;
`;

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
		<S.Container>
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
						<input {...bindField(form.fields.password)} type='password' placeholder='Пароль' required />
					</div>
					<SubmitButton type='submit'>Войти</SubmitButton>
				</form>
			</div>
		</S.Container>
	);
};
