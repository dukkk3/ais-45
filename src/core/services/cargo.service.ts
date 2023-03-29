import { api } from "./api";

export interface Cargo {
	id: number;
	weight: number;
	width: number;
	height: number;
	depth: number;
	x: number;
	y: number;
	z: number;
	loadingPlanId: number;
}

interface CreateCargoData extends Omit<Cargo, "id"> {}

export const getAll = () => api.get<{ data: Cargo[] }>("/cargo/all");
export const create = (data: CreateCargoData) => api.post<{ data: Cargo[] }>("/cargo", data);
export const removeById = (id: string | number) => api.delete(`/cargo/${id}`);
