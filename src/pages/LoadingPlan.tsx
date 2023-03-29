import { useCallback, useEffect, useState } from "react";
import { createForm, useForm } from "effector-forms";

import { loadingPlanService } from "../core/services";
import { bindField } from "../core/helpers";

import { Navigation } from "./Navigation";

const $createLoadingPlanForm = createForm({
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

const $updateLoadingPlanForm = createForm({
	fields: {
		ids: {
			init: "",
		},
		vehicleId: {
			init: "",
		},
	},
});

export const LoadingPlan: React.FC = () => {
	const [loadingPlans, setLoadingPlans] = useState<loadingPlanService.LoadingPlan[]>([]);
	const createLoadingPlanForm = useForm($createLoadingPlanForm);
	const updateLoadingPlanForm = useForm($updateLoadingPlanForm);

	const updateList = useCallback(() => {
		loadingPlanService.getAll().then(({ data }) => {
			setLoadingPlans(data.data);
		});
	}, []);

	const handleCreateLoadingPlanFormSubmit = useCallback((event: React.FormEvent) => {
		event.preventDefault();

		const values = $createLoadingPlanForm.$values.getState();

		loadingPlanService
			.create({
				weight: Number(values.weight),
				width: Number(values.width),
				height: Number(values.height),
				depth: Number(values.depth),
			})
			.then(updateList);
	}, []);

	const handleUpdateLoadingPlanFormSubmit = useCallback((event: React.FormEvent) => {
		event.preventDefault();

		const values = $updateLoadingPlanForm.$values.getState();

		loadingPlanService
			.update({
				ids: values.ids.split(",").map((i) => Number(i.trim())),
				vehicleId: Number(values.vehicleId),
			})
			.then(updateList);
	}, []);

	useEffect(() => {
		updateList();
	}, []);

	return (
		<div>
			<Navigation />
			<form onSubmit={handleCreateLoadingPlanFormSubmit} style={{ borderBottom: "1px solid white" }}>
				<input {...bindField(createLoadingPlanForm.fields.width)} type='number' placeholder='Ширина' />
				<input {...bindField(createLoadingPlanForm.fields.height)} type='number' placeholder='Высота' />
				<input {...bindField(createLoadingPlanForm.fields.depth)} type='number' placeholder='Глубина' />
				<input {...bindField(createLoadingPlanForm.fields.weight)} type='number' placeholder='Вес' />
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
					{loadingPlans
						.filter((loadingPlan) => !loadingPlan.needProcess)
						.map((vehicle) => (
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
			<p>Планы загрузок на отправку</p>
			<form
				onSubmit={handleUpdateLoadingPlanFormSubmit}
				style={{ display: "flex", alignItems: "center", borderBottom: "1px solid white" }}>
				<input
					{...bindField(updateLoadingPlanForm.fields.ids)}
					type='text'
					placeholder='ID планов загрузки через запятую'
				/>
				<input
					{...bindField(updateLoadingPlanForm.fields.vehicleId)}
					type='text'
					placeholder='ID машины'
				/>
				<button type='submit'>Передать в обработку</button>
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
					{loadingPlans
						.filter((loadingPlan) => loadingPlan.needProcess)
						.map((vehicle) => (
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
