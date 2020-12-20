import * as CSS from "csstype";

export enum FieldType {
  Tel = "tel",
  Radio = "radio",
  Checkbox = "checkbox",
  Select = "select",
  Picker = "picker",
  Textarea = "textarea",
}

export interface Filed {
  name: string;
  field: string;
  disabled?: boolean;
  value?: string;
  defaultDisplay?: string;
  readonly?: boolean;
  type:
    | "tel"
    | "radio"
    | "checkbox"
    | "select"
    | "picker"
    | "textarea"
    | "file"
    | "text";
    accept?: string;
  options?: Option[];
  keyMap?: {
    [keys: string]: any;
  };
  cancelBtnText?: string;
  confirmBtnText?: string;
  title?: string;
  splitSymbol?: string;
  placeholder?: string;
  maxlength?: string;
  validate?: {
    /** 验证电话号码 */
    VPhone?: valdateItem & {
      /**
       * 严格模式，默认false时只验证1开头11位数字
       */
      strict?: boolean;
    };
    /** 验证名称 */
    VName?: valdateItem & {
      /**
       * 中文模式，只能填写2位以上中文字符，默认false
       */
      Zh?: boolean;
    };
    /** 验证Email */
    VEmail?: valdateItem;
    /** 验证必填 */
    VRequire?: valdateItem & {
      /** 最少要求多少位字符(number)不填时默认1个字符 */
      length?: number;
    };
    /** 验证最少字符长度 */
    VLimit?: valdateItem & {
      /** 最多输入多少位字符(number)不填时默认20个字符 */
      length?: number;
    };
    /** 验证数字 */
    VNumber?: valdateItem;
    /** 验证中文 */
    VChinese?: valdateItem;
    /** 验证英文 */
    VEnglish?: valdateItem;
    /** 验证相等 */
    VEqual?: valdateItem & {
      /** 比较对象，输入'${field}'时表示与对应字段做比较 */
      comparator?: string;
    };
    /** 验证危险脚本字符 */
    VDangerousChar?: valdateItem;
    /** 验证身份证 */
    VIdCard?: valdateItem;
  };
}

interface valdateItem {
  /**
   * 验证信息, 非必填，不填时显示默认信息
   */
  Msg?: string;
}

export interface Option {
  label?: string;
  value?: string;
  data?: any;
}

export interface Style {
  /**标题 */
  title?: CSS.Properties;
  /**表单外框 */
  formWorp?: CSS.Properties;
  /**表单按钮外框 */
  formButtonWrap?: CSS.Properties;
  /**提交按钮 */
  formSubmit?: CSS.Properties;
  /**重置按钮 */
  formReset?: CSS.Properties;
  /**提交按钮包裹 */
  formSubmitWrap?: CSS.Properties;
  /**重置按钮包裹 */
  formResetWrap?: CSS.Properties;
  /**表单项 */
  formItem?: CSS.Properties;
  /**表单项label */
  formItemLabel?: CSS.Properties;
  /**表单项内容 */
  formItemContent?: CSS.Properties;
  /**表单项select */
  formItemSelect?: CSS.Properties;
  /**表单项select 下拉箭头 */
  formItemSelectArrow?: CSS.Properties;
  /**表单子项radio */
  formItemSubLabelRadio?: CSS.Properties;
  /**表单子项radio label */
  formItemSubRadioDisc?: CSS.Properties;
  /**表单子项radio符号标志 */
  formItemSubRadioIndicator?: CSS.Properties;
  /**表单子项checkbox */
  formItemSubLabelCheckbox?: CSS.Properties;
  /**表单子项checkbox label */
  formItemSubCheckboxDisc?: CSS.Properties;
  /**表单子项checkbox符号标志 */
  formItemSubCheckboxIndicator?: CSS.Properties;
  /**表单按钮pickerButton */
  formItemButtonPickerButton?: CSS.Properties;
  /**表单项textarea */
  formItemTextarea?: CSS.Properties;
  /**表单项input */
  formItemInput?: CSS.Properties;
  /**Picker样式 */
  formPicker?: {
    /**
     * 覆盖层
     */
    overlay?: CSS.Properties;
    /**
     * 外框
     */
    wrap?: CSS.Properties;
    /**
     * 标题栏
     */
    headlines?: CSS.Properties;
    /**
     * 标题
     */
    title?: CSS.Properties;
    /**
     * 取消
     */
    cancel?: CSS.Properties;
    /**
     * 确定
     */
    confirm?: CSS.Properties;
    /**
     * 轮子面板
     */
    panel?: CSS.Properties;
    /**
     * 选择线
     */
    selectline?: CSS.Properties;
    /**
     * 轮子面板覆盖层
     */
    mask?: CSS.Properties;
  };
}
