import axios from "axios";

import { $authToken } from "../session";

export const api = axios.create({
	baseURL: "http://localhost:3000/api",
	headers: {
		Authorization: $authToken.getState() ? `bearer ${$authToken.getState()}` : undefined,
	},
});
