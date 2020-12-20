import { Field } from "~/types/data";
export declare const checkType: (data: any, Type: "Array" | "String" | "Object", tag?: string) => void;
export declare const removeErrorDom: (dom: HTMLDivElement) => void;
export declare const handleValidate: (val: string, item: Field, dom: HTMLDivElement) => boolean;
