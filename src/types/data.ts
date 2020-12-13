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
    defaultDisplay?: string;
    type?: "tel" | "radio" | "checkbox" | "select" | "picker";
    options?: Option [],
    keyMap?: { 
        [keys: string]: any
    };
    cancelBtnText?: string;
    confirmBtnText?: string;
    title?: string;
    splitSymbol?: string;
    placeholder?: string;
}

export interface Option {
    label?: string,
    value?: string,
    data?: any
}

