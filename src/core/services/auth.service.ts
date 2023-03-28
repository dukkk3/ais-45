import { api } from "./api";

export const login = ({ login, password }: { login: string; password: string }) =>
	api.post<{ data: { token: string } }>("/login", { login, password });

export const signin = (data: {
	login: string;
	password: string;
	firstName: string;
	secondName: string;
	middleName: string;
}) => api.post<{ data: { token: string } }>("/signin", data);
