import { ConnectedField } from "effector-forms/dist-types";

export const bindField = (field: ConnectedField<any>) => ({
	value: field.value,
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => field.onChange(event.target.value),
});
