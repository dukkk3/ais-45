import { api } from "./api";

export interface Vehicle {
	id: number;
	weight: number;
	width: number;
	height: number;
	depth: number;
}

interface CreateVehicleData extends Omit<Vehicle, "id"> {}

export const getAll = () => api.get<{ data: Vehicle[] }>("/vehicle/all");
export const create = (data: CreateVehicleData) => api.post<{ data: Vehicle[] }>("/vehicle", data);
export const removeById = (id: string | number) => api.delete(`/vehicle/${id}`);
