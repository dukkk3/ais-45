import { createHashRouter, RouterProvider } from "react-router-dom";

import { Login } from "./pages/Login";
import { Signin } from "./pages/Signin";
import { LoadingPlan } from "./pages/LoadingPlan";
import { AuthGuard } from "./pages/AuthGuard";
import { NonAuthGuard } from "./pages/NonAuthGuard";
import { Exit } from "./pages/Exit";

const router = createHashRouter([
	{
		path: "/logout",
		element: <Exit />,
	},
	{
		path: "/login",
		element: (
			<NonAuthGuard>
				<Login />
			</NonAuthGuard>
		),
	},
	{
		path: "/signin",
		element: (
			<NonAuthGuard>
				<Signin />
			</NonAuthGuard>
		),
	},
	{
		path: "/",
		element: (
			<AuthGuard>
				<LoadingPlan />
			</AuthGuard>
		),
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
