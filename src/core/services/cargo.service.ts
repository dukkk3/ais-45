import { api } from "./api";

export interface Cargo {
	id: number;
	weight: number;
	width: number;
	height: number;
	depth: number;
}

interface CreateCargoData extends Omit<Cargo, "id"> {
	loadingPlanId: number;
}

export const getAll = () => api.get<{ data: Cargo[] }>("/cargo/all");
export const create = (data: CreateCargoData) => api.post<{ data: Cargo[] }>("/cargo", data);
export const removeById = (id: string | number) => api.delete(`/cargo/${id}`);
