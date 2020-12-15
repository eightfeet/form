export enum FieldType {
    Tel = "tel",
    Radio = "radio",
    Checkbox = "checkbox",
    Select = "select",
    Picker = "picker",
    Textarea = "textarea"
}

export interface Filed {
    name: string;
    field: string;
    disabled?: boolean;
    value?: string;
    defaultDisplay?: string;
    readonly?:boolean;
    type: "tel" | "radio" | "checkbox" | "select" | "picker" | "textarea" | "text";
    options?: Option [],
    keyMap?: { 
        [keys: string]: any
    };
    cancelBtnText?: string;
    confirmBtnText?: string;
    title?: string;
    splitSymbol?: string;
    placeholder?: string;
    validate?: {
        /** 验证电话号码 */
        VPhone?:valdateItem & {
            /**
             * 严格模式，默认false时只验证1开头11位数字
             */
            strict?: boolean
        };
        /** 验证名称 */
        VName?:valdateItem & {
            /**
             * 中文模式，只能填写2位以上中文字符，默认false
             */
            Zh?: boolean
        };
        /** 验证Email */
        VEmail?:valdateItem;
        /** 验证必填 */
        VRequire?:valdateItem & {
            /** 最少要求多少位字符(number)不填时默认1个字符 */
            length?: number
        };
        /** 验证最少字符长度 */
        VLimit?:valdateItem & {
            /** 最多输入多少位字符(number)不填时默认20个字符 */
            length?: number
        };
        /** 验证数字 */
        VNumber?:valdateItem;
        /** 验证中文 */
        VChinese?:valdateItem;
        /** 验证英文 */
        VEnglish?:valdateItem;
        /** 验证相等 */
        VEqual?:valdateItem & {
            /** 比较对象，输入'${field}'时表示与对应字段做比较 */
            comparator?: string
        };
        /** 验证危险脚本字符 */
        VDangerousChar?:valdateItem;
        /** 验证身份证 */
        VIdCard?:valdateItem;
    }
}

interface valdateItem {
    /**
     * 验证信息, 非必填，不填时显示默认信息
     */
    Msg?: string,
}

export interface Option {
    label?: string,
    value?: string,
    data?: any
}

