export enum FieldType {
    Tel = "tel",
    Radio = "radio",
    Checkbox = "checkbox",
    Select = "select"
}

export interface Filed {
    name: string;
    field: string;
    value: string;
    type?: "tel" | "radio" | "checkbox" | "select";
    options?: Option[]
}

export interface Option {
    label: string,
    value: string
}
