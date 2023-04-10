import { api } from "./api";

export interface LoadingPlan {
	id: number;
	name: string;
	expiresOn: string;
	processed: boolean;
}

export const getAll = () => api.get<{ data: LoadingPlan[] }>("/loading-plan/all");
export const create = (data: Omit<LoadingPlan, "id" | "processed">) =>
	api.post<{ data: LoadingPlan[] }>("/loading-plan", data);
export const processAll = ({ whenLessDays }: { whenLessDays: number }) =>
	api.put<{ data: LoadingPlan }>(`/process-loading-plans`, {
		whenLessDays,
	});
export const removeById = (id: string | number) => api.delete(`/loading-plan/${id}`);
