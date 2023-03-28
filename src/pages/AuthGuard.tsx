import { useEffect } from "react";
import { useStore } from "effector-react";
import { useNavigate } from "react-router";

import { $authToken } from "../core/session";

export const AuthGuard: React.FC<React.PropsWithChildren> = ({ children }) => {
	const authToken = useStore($authToken);
	const navigate = useNavigate();

	useEffect(() => {
		if (!authToken) {
			navigate("/login");
		}
	}, []);

	return <>{children}</>;
};
