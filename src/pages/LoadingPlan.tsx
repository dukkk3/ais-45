import { useCallback, useEffect, useState } from "react";
import { createForm, useForm } from "effector-forms";

import { loadingPlanService } from "../core/services";
import { bindField } from "../core/helpers";

import { Navigation } from "./Navigation";

const $createLoadingPlanForm = createForm({
	fields: {
		vehiclesIds: {
			init: "",
		},
	},
});

export const LoadingPlan: React.FC = () => {
	const [loadingPlans, setLoadingPlans] = useState<loadingPlanService.LoadingPlan[]>([]);
	const createLoadingPlanForm = useForm($createLoadingPlanForm);

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
				vehiclesIds: values.vehiclesIds.split(",").map((id) => Number(id.trim())),
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
				<input
					{...bindField(createLoadingPlanForm.fields.vehiclesIds)}
					type='text'
					placeholder='ID машин через запятую'
				/>
				<button type='submit'>Создать</button>
			</form>
			<table style={{ width: "100%" }}>
				<tr>
					<th>ID</th>
					<th>ID машин</th>
				</tr>
				{loadingPlans.map((loadingPlan) => (
					<tr key={loadingPlan.id}>
						<td>{loadingPlan.id}</td>
						<td>{loadingPlan.vehicle2LoadingPlans.map((i) => i.vehicleId).join(", ")}</td>
					</tr>
				))}
			</table>
		</div>
	);
};
