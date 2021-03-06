import { Field, Style } from "./../../types/data";
declare const _default: ({ id, parentId, title, fields, style, emBase, onSubmit, onReset, submitText, resetText, }: {
    id: string;
    parentId?: string;
    title?: string;
    fields: Field[];
    style?: Style;
    emBase?: number;
    onSubmit: (data: {
        [keys: string]: any;
    }) => void;
    onReset: () => void;
    submitText: string;
    resetText: string;
}) => Promise<{
    pickers: any[];
}>;
export default _default;
export declare const render: (config: Field, style: Style, formId: string) => string;
export declare const renderInput: (formId: string, { name, field, value, type, placeholder, disabled, readonly, maxlength, accept, }: Field, formItemStyle: string, formItemLabelStyle: string, formItemContentStyle: string, formItemInputStyle: string) => string;
export declare const renderTextarea: (formId: string, { name, field, value, type, placeholder, disabled, readonly }: Field, formItemStyle: string, formItemLabelStyle: string, formItemContentStyle: string, formItemTextareaStyle: string) => string;
export declare const renderSelect: (formId: string, { name, field, value, options, placeholder, disabled, readonly }: Field, formItemStyle: string, formItemLabelStyle: string, formItemContentStyle: string, formItemSelectStyle: string, formItemSelectArrowStyle: string) => string;
export declare const renderRadio: (formId: string, { name, options, field, value, disabled, readonly }: Field, formItemStyle?: string, formItemLabelStyle?: string, formItemContentStyle?: string, formItemSubLabelRadioStyle?: string, formItemSubRadioDiscStyle?: string, formItemSubRadioIndicatorStyle?: string) => string;
export declare const renderCheckbox: (formId: string, { name, field, value, options, disabled, readonly }: Field, formItemStyle?: string, formItemLabelStyle?: string, formItemContentStyle?: string, formItemSubLabelCheckboxStyle?: string, formItemSubCheckboxDiscStyle?: string, formItemSubCheckboxIndicatorStyle?: string) => string;
export declare const renderPicker: (formId: string, { name, field, value, placeholder, disabled, readonly }: Field, formItemStyle?: string, formItemLabelStyle?: string, formItemContentStyle?: string, formItemButtonPickerButtonStyle?: string) => string;
export declare const onChangeOther: (item: Field, form: HTMLFormElement, formId: string) => void;
