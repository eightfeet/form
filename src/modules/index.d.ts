import { Filed } from "~/types/data";
declare class Form {
    pickers: any[];
    id: string;
    parentId: string;
    emBase: number;
    formTitle: string;
    submitText: string;
    resetText: string;
    constructor({ id, parentId, emBase, fields, onSubmit, onReset, formTitle, submitText, resetText }: {
        /**form id */
        id?: string;
        /**form 父级id */
        parentId?: string;
        /**基准字体大小 */
        emBase?: number;
        /**表单字段 */
        fields?: Filed[];
        /**提交 */
        onSubmit?: (data: {
            [keys: string]: any;
        }) => void;
        /**重置 */
        onReset?: () => void;
        /**表单标题 */
        formTitle?: string;
        /**提交按钮文字 */
        submitText?: string;
        /**重置按钮文字 */
        resetText?: string;
    });
    initForm: (fields: Filed[], onSubmit?: (data: {
        [keys: string]: any;
    }) => void, onReset?: () => void, text?: {
        [keys: string]: string;
    }) => void;
    destroy: () => void;
}
export default Form;
