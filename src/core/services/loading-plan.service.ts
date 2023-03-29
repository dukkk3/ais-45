import { api } from "./api";
import type { Vehicle } from "./vehicle.service";

export interface LoadingPlan {
	id: number;
	width: number;
	height: number;
	weight: number;
	depth: number;
	vehicleId: number;
	needProcess: boolean;
}

export const getAll = () => api.get<{ data: LoadingPlan[] }>("/loading-plan/all");
export const create = (data: Omit<LoadingPlan, "vehicleId" | "id" | "needProcess">) =>
	api.post<{ data: LoadingPlan[] }>("/loading-plan", data);
export const update = (data: { ids: number[]; vehicleId: number }) =>
	api.put<{ data: LoadingPlan }>(`/pack-loading-plans`, {
		loadingPlansIds: data.ids,
		vehicleId: data.vehicleId,
	});
export const removeById = (id: string | number) => api.delete(`/loading-plan/${id}`);
