import { Wheels } from "@eightfeet/picker";

export enum FieldType {
    Tel = "tel",
    Radio = "radio",
    Checkbox = "checkbox",
    Select = "select",
    Picker = "picker"
}

export interface Filed {
    name: string;
    field: string;
    value: string;
    type?: "tel" | "radio" | "checkbox" | "select" | "picker";
    options?: Option []
}

export interface Option {
    label?: string,
    value?: string,
    data?: any
}

