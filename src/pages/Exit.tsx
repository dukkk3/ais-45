import { useEffect } from "react";
import { useNavigate } from "react-router";
import { authService } from "../core/services";

export const Exit: React.FC = () => {
	const navigate = useNavigate();

	useEffect(() => {
		authService.logout();
		navigate("/login");
	}, []);

	return null;
};
