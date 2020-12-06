export enum FieldType {
    Tel = "tel",
    Radio = "radio",
    Checkbox = "checkbox"
}

export interface Filed {
    name: string;
    field: string;
    value: string;
    type?: "tel" | "radio" | "checkbox";
    options?: Option[]
}

export interface Option {
    label: string,
    value: string
}
