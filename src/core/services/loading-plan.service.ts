import { api } from "./api";
import type { Vehicle } from "./vehicle.service";

export interface LoadingPlan {
	id: number;
	vehicle2LoadingPlans: {
		vehicleId: number;
		loadingPlanId: number;
		vehicle: Vehicle;
	}[];
}

export const getAll = () => api.get<{ data: LoadingPlan[] }>("/loading-plan/all");
export const create = (data: { vehiclesIds: number[] }) =>
	api.post<{ data: LoadingPlan[] }>("/loading-plan", data);
export const removeById = (id: string | number) => api.delete(`/loading-plan/${id}`);
