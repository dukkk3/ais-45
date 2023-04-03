import { useCallback, useEffect, useState } from "react";
import { createForm, useForm } from "effector-forms";

import { vehicleService } from "../core/services";
import { bindField } from "../core/helpers";

import { Navigation } from "./Navigation";

const $createVehicleForm = createForm({
	fields: {
		width: {
			init: "",
		},
		height: {
			init: "",
		},
		weight: {
			init: "",
		},
		depth: {
			init: "",
		},
	},
});

export const Vehicle: React.FC = () => {
	const [vehicles, setVehicles] = useState<vehicleService.Vehicle[]>([]);
	const createVehicleForm = useForm($createVehicleForm);

	const updateList = useCallback(() => {
		vehicleService.getAll().then(({ data }) => {
			setVehicles(data.data);
		});
	}, []);

	const handleCreateVehicleFormSubmit = useCallback((event: React.FormEvent) => {
		event.preventDefault();

		const values = $createVehicleForm.$values.getState();

		vehicleService
			.create({
				weight: Number(values.weight),
				width: Number(values.width),
				height: Number(values.height),
				depth: Number(values.depth),
			})
			.then(updateList);
	}, []);

	useEffect(() => {
		updateList();
	}, []);

	return (
		<div>
			<Navigation />
			<form onSubmit={handleCreateVehicleFormSubmit} style={{ borderBottom: "1px solid white" }}>
				<input
					{...bindField(createVehicleForm.fields.width)}
					type='number'
					placeholder='Ширина'
					min='1'
					required
				/>
				<input
					{...bindField(createVehicleForm.fields.height)}
					type='number'
					placeholder='Высота'
					min='1'
					required
				/>
				<input
					{...bindField(createVehicleForm.fields.depth)}
					type='number'
					placeholder='Глубина'
					min='1'
					required
				/>
				<input
					{...bindField(createVehicleForm.fields.weight)}
					type='number'
					placeholder='Вес'
					min='1'
					required
				/>
				<button type='submit'>Создать</button>
			</form>
			<table style={{ width: "100%" }}>
				<thead>
					<tr>
						<th>ID</th>
						<th>Вес</th>
						<th>Ширина</th>
						<th>Высота</th>
						<th>Глубина</th>
					</tr>
				</thead>
				<tbody>
					{vehicles.map((vehicle) => (
						<tr key={vehicle.id}>
							<td>{vehicle.id}</td>
							<td>{vehicle.weight}</td>
							<td>{vehicle.width}</td>
							<td>{vehicle.height}</td>
							<td>{vehicle.depth}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
