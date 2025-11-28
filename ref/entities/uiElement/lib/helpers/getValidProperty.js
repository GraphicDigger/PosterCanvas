// Фильтруем undefined значения чтобы избежать переопределения CSS cascade
export const getValidProperty = (value) => value !== undefined && value !== null ? value : undefined;
