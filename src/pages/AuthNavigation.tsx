import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Button = styled.button`
	width: 100%;
`;

const Container = styled.div`
	display: flex;
	width: 100%;
`;

export const AuthNavigation: React.FC = () => {
	const location = useLocation();

	return (
		<Container>
			{[
				{ name: "Войти", path: "/login" },
				{ name: "Регистрация", path: "/signin" },
			].map(({ name, path }) => (
				<Link to={path} key={path}>
					<Button type='button' style={{ background: path === location.pathname ? "blue" : undefined }}>
						{name}
					</Button>
				</Link>
			))}
		</Container>
	);
};
