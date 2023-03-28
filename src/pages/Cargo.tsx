import { useCallback, useEffect, useState } from "react";
import { createForm, useForm } from "effector-forms";

import { cargoService } from "../core/services";
import { bindField } from "../core/helpers";

import { Navigation } from "./Navigation";

const $createCargoForm = createForm({
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
		loadingPlanId: {
			init: "",
		},
	},
});

export const Cargo: React.FC = () => {
	const [cargos, setCargos] = useState<cargoService.Cargo[]>([]);
	const createCargoForm = useForm($createCargoForm);

	const updateList = useCallback(() => {
		cargoService.getAll().then(({ data }) => {
			setCargos(data.data);
		});
	}, []);

	const handleCreateCargoFormSubmit = useCallback((event: React.FormEvent) => {
		event.preventDefault();

		const values = $createCargoForm.$values.getState();

		cargoService
			.create({
				weight: Number(values.weight),
				width: Number(values.width),
				height: Number(values.height),
				depth: Number(values.depth),
				loadingPlanId: Number(values.loadingPlanId),
			})
			.then(updateList);
	}, []);

	useEffect(() => {
		updateList();
	}, []);

	return (
		<div>
			<Navigation />
			<form onSubmit={handleCreateCargoFormSubmit} style={{ borderBottom: "1px solid white" }}>
				<input {...bindField(createCargoForm.fields.width)} type='number' placeholder='Ширина' />
				<input {...bindField(createCargoForm.fields.height)} type='number' placeholder='Высота' />
				<input {...bindField(createCargoForm.fields.depth)} type='number' placeholder='Глубина' />
				<input {...bindField(createCargoForm.fields.weight)} type='number' placeholder='Вес' />
				<input
					{...bindField(createCargoForm.fields.loadingPlanId)}
					type='number'
					placeholder='ID плана загрузки'
				/>
				<button type='submit'>Создать</button>
			</form>
			<table style={{ width: "100%" }}>
				<tr>
					<th>ID</th>
					<th>Вес</th>
					<th>Ширина</th>
					<th>Высота</th>
					<th>Глубина</th>
				</tr>
				{cargos.map((cargo) => (
					<tr key={cargo.id}>
						<td>{cargo.id}</td>
						<td>{cargo.weight}</td>
						<td>{cargo.width}</td>
						<td>{cargo.height}</td>
						<td>{cargo.depth}</td>
					</tr>
				))}
			</table>
		</div>
	);
};
