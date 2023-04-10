import { useCallback, useEffect, useState } from "react";
import { createForm, useForm } from "effector-forms";
import dayjs from "dayjs";

import { loadingPlanService } from "../core/services";
import { bindField } from "../core/helpers";

import { Navigation } from "./Navigation";

const $createLoadingPlanForm = createForm({
	fields: {
		name: {
			init: "",
		},
		expiresOn: {
			init: "",
		},
	},
});

const $updateLoadingPlanForm = createForm({
	fields: {
		whenLessDays: {
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
				name: values.name,
				expiresOn: dayjs(values.expiresOn).format("YYYY-MM-DD"),
			})
			.then(updateList);
	}, []);

	const handleUpdateLoadingPlanFormSubmit = useCallback((event: React.FormEvent) => {
		event.preventDefault();

		const values = $updateLoadingPlanForm.$values.getState();

		loadingPlanService
			.processAll({
				whenLessDays: Number(values.whenLessDays),
			})
			.then(updateList);
	}, []);

	useEffect(() => {
		updateList();
	}, []);

	return (
		<div>
			<Navigation />
			<h1>Грузы</h1>
			<form
				onSubmit={handleCreateLoadingPlanFormSubmit}
				style={{
					border: "1px solid black",
					padding: "1rem",
					borderRadius: "1rem",
					marginBottom: "1rem",
				}}>
				<p>Создание</p>
				<input
					{...bindField(createLoadingPlanForm.fields.name)}
					type='text'
					placeholder='Название'
					required
					style={{ marginRight: "1rem" }}
				/>
				<input
					{...bindField(createLoadingPlanForm.fields.expiresOn)}
					type='date'
					placeholder='До какого числа годен'
					required
					style={{ marginRight: "1rem" }}
				/>
				<button type='submit'>Создать</button>
			</form>
			<table style={{ width: "100%" }}>
				<thead>
					<tr>
						<th>ID</th>
						<th>Название</th>
						<th>До конца срока годности</th>
						<th>В обработке</th>
					</tr>
				</thead>
				<tbody>
					{loadingPlans.map((loadingPlan) => (
						<tr key={loadingPlan.id}>
							<th>{loadingPlan.id}</th>
							<th>{loadingPlan.name}</th>
							<th>{dayjs(loadingPlan.expiresOn).diff(dayjs(), "days")}</th>
							<th>{loadingPlan.processed ? "Да" : "Нет"}</th>
						</tr>
					))}
				</tbody>
			</table>
			<p>Отправка на отгрузку</p>
			<form
				onSubmit={handleUpdateLoadingPlanFormSubmit}
				style={{ display: "flex", alignItems: "center", borderBottom: "1px solid white" }}>
				<input
					{...bindField(updateLoadingPlanForm.fields.whenLessDays)}
					type='number'
					placeholder='Количество дней до истечения срока годности'
					required
					min='0'
				/>
				<button type='submit'>Передать в обработку</button>
			</form>
		</div>
	);
};
