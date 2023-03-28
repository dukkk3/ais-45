import { Link, useLocation } from "react-router-dom";

export const AuthNavigation: React.FC = () => {
	const location = useLocation();

	return (
		<div>
			{[
				{ name: "Войти", path: "/login" },
				{ name: "Регистрация", path: "/signin" },
			].map(({ name, path }) => (
				<Link to={path} key={path}>
					<button type='button' style={{ background: path === location.pathname ? "blue" : undefined }}>
						{name}
					</button>
				</Link>
			))}
		</div>
	);
};
