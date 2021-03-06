import s from "./form.scss";
import { html } from "common-tags";
import { checkType, handleValidate, removeErrorDom } from "./../helper";
import { Field, FieldType, Option, Style } from "./../../types/data";
import Picker, { Option as pickerOption } from "@eightfeet/picker";
import { createInlineStyles } from "@eightfeet/modal";
import setEmBase from "~/core/setRem";

// 处理行内样式
const createStyle = (style: any) => {
  const inlineStyle = createInlineStyles(style);
  if (!inlineStyle) {
    return "";
  }
  return `style="${inlineStyle}"`;
};

export default async ({
  id,
  parentId,
  title,
  fields,
  style,
  emBase,
  onSubmit,
  onReset,
  submitText,
  resetText,
}: {
  id: string;
  parentId?: string;
  title?: string;
  fields: Field[];
  style?: Style;
  emBase?: number;
  onSubmit: (data: { [keys: string]: any }) => void;
  onReset: () => void;
  submitText: string;
  resetText: string
}) => {
  const rootDom = document.getElementById(parentId) || document.body;
  // 检查数据
  checkType(fields, "Array", "fields");

  const pickerStyle = style?.formPicker || {};
  const pickers = [];

  // 创建内容
  const htmlString:(formId: string) => string = (formId) => html`
    ${title
      ? html` <h3 class="${s.title} form_title" ${createStyle(style?.title)}>
          ${title}
        </h3>`
      : ""}
    <ul class="${s.wrap} form_worp" ${createStyle(style?.formWorp)}>
      ${fields.map((item) => render(item, style, formId))}
    </ul>
    <ul
      class="${s.formbuttonwrap} form_button_wrap"
      ${createStyle(style?.formButtonWrap)}
    >
      <li
        class=" ${s.formbutton} ${s.formsubmit} form_submit form_button"
        ${createStyle(style?.formSubmitWrap)}
      >
        <button
          type="submit"
          class="form_submit_button"
          ${createStyle(style?.formSubmit)}
        >
          ${submitText || '提交'}
        </button>
      </li>
      <li
        class=" ${s.formbutton} ${s.formreset} form_reset form_button"
        ${createStyle(style?.formResetWrap)}
      >
        <button
          type="reset"
          class="form_reset_button"
          ${createStyle(style?.formReset)}
        >
          ${resetText || '重置'}
        </button>
      </li>
    </ul>
  `;
  // 创建form
  const form = document.createElement("form");
  form.id = `form${id}`;
  form.classList.add(s.form);
  form.innerHTML = htmlString(form.id);
  rootDom.appendChild(form);
  // 绑定事件
  fields.forEach((item: Field) => {
    switch (item.type) {
      case FieldType.Checkbox:
        onChangeCheckbox(item, form, form.id);
        break;
      case FieldType.Radio:
        onChangeRadio(item, form, form.id );
        break;
      case FieldType.Picker:
        pickers.push(handlePicker(item, form, pickerStyle, form.id));
        break;
      default:
        onChangeOther(item, form, form.id);
        break;
    }
  });

  form.onsubmit = (e) => {
    e.preventDefault();
    let validated: boolean[] = [];
    const formData = new FormData(form);
    const result = {};
    fields.forEach((element) => {
      const { field, type, disabled } = element;
      const valdom = document.getElementById(`${form.id}${field}`) as HTMLInputElement;
      if (type === FieldType.Picker && !disabled) {
        result[field] = valdom.value;
      } else {
        const data = formData.get(`${form.id}${field}`);
        result[field] = data;
      }
      validated.push(
        handleValidate(
          valdom.value,
          element,
          valdom.parentNode as HTMLDivElement
        )
      );
    });
    if (validated.includes(false)) {
      return;
    }
    if (typeof(onSubmit) === 'function') {
      onSubmit(result);
    }
  };

  form.onreset = (e) => {
    fields.forEach(({ field, type }) => {
      const fieldDOM = document.getElementById(`${form.id}${field}`) as HTMLButtonElement;
      if (type === FieldType.Picker) {
        const defaultVal = fieldDOM.getAttribute("data-default-value");
        const defaultText = fieldDOM.getAttribute("data-default-display");
        fieldDOM.value = defaultVal;
        fieldDOM.innerText = defaultText;
      }
      removeErrorDom(fieldDOM.parentNode as HTMLDivElement);
    });
    if (typeof(onReset) === 'function') {
      onReset();
    }
  };
  setEmBase(form, parentId, emBase)
  return {pickers};
};

export const render = (config: Field, style: Style, formId: string) => {
  const formItem = createStyle(style.formItem);
  const formItemLabel = createStyle(style.formItemLabel);
  const formItemContent = createStyle(style.formItemContent);
  const formItemSelect = createStyle(style.formItemSelect);
  const formItemSelectArrow = createStyle(style.formItemSelectArrow);
  const formItemSubLabelRadio = createStyle(style.formItemSubLabelRadio);
  const formItemSubRadioDisc = createStyle(style.formItemSubRadioDisc);
  const formItemSubRadioIndicator = createStyle(
    style.formItemSubRadioIndicator
  );
  const formItemSubLabelCheckbox = createStyle(style.formItemSubLabelCheckbox);
  const formItemSubCheckboxDisc = createStyle(style.formItemSubCheckboxDisc);
  const formItemSubCheckboxIndicator = createStyle(
    style.formItemSubCheckboxIndicator
  );
  const formItemButtonPickerButton = createStyle(
    style.formItemButtonPickerButton
  );
  const formItemTextarea = createStyle(style.formItemTextarea);
  const formItemInput = createStyle(style.formItemInput);

  switch (config.type) {
    case FieldType.Radio:
      return renderRadio(
        formId,
        config,
        formItem,
        formItemLabel,
        formItemContent,
        formItemSubLabelRadio,
        formItemSubRadioDisc,
        formItemSubRadioIndicator
      );
    case FieldType.Checkbox:
      return renderCheckbox(
        formId,
        config,
        formItem,
        formItemLabel,
        formItemContent,
        formItemSubLabelCheckbox,
        formItemSubCheckboxDisc,
        formItemSubCheckboxIndicator
      );
    case FieldType.Select:
      return renderSelect(
        formId,
        config,
        formItem,
        formItemLabel,
        formItemContent,
        formItemSelect,
        formItemSelectArrow
      );
    case FieldType.Picker:
      return renderPicker(
        formId,
        config,
        formItem,
        formItemLabel,
        formItemContent,
        formItemButtonPickerButton
      );
    case FieldType.Textarea:
      return renderTextarea(
        formId,
        config,
        formItem,
        formItemLabel,
        formItemContent,
        formItemTextarea
      );
    default:
      return renderInput(
        formId,
        config,
        formItem,
        formItemLabel,
        formItemContent,
        formItemInput
      );
  }
};

export const renderInput = (
  formId: string,
  {
    name,
    field,
    value,
    type,
    placeholder,
    disabled,
    readonly,
    maxlength,
    accept,
  }: Field,
  formItemStyle: string,
  formItemLabelStyle: string,
  formItemContentStyle: string,
  formItemInputStyle: string
) => {
  return html`
    <li class="${s.formitem} form_item" ${formItemStyle}>
      <label
        class="${s.formitemlabel} form_item_label"
        ${formItemLabelStyle}
        for="${formId}${field}"
        >${name}</label
      >
      <div
        class="${s.formitemcontent} form_item_content"
        ${formItemContentStyle}
      >
        <input
          class="form_item_text"
          ${formItemInputStyle}
          ${disabled ? "disabled" : ""}
          ${readonly ? "readonly" : ""}
          ${maxlength ? `maxlength="${maxlength}"` : ""}
          ${accept ? `accept="${accept}"` : ""}
          type="${type}"
          id="${formId}${field}"
          name="${formId}${field}"
          value="${value}"
          placeholder="${placeholder}"
        />
      </div>
    </li>
  `;
};

export const renderTextarea = (
  formId: string,
  { name, field, value, type, placeholder, disabled, readonly }: Field,
  formItemStyle: string,
  formItemLabelStyle: string,
  formItemContentStyle: string,
  formItemTextareaStyle: string
) => {
  return html`
    <li class="${s.formitem} form_item" ${formItemStyle}>
      <label
        class="${s.formitemlabel} form_item_label"
        ${formItemLabelStyle}
        for="${formId}${field}"
        >${name}</label
      >
      <div
        class="${s.formitemcontent} form_item_content"
        ${formItemContentStyle}
      >
        <textarea
          class="form_item_textarea"
          ${formItemTextareaStyle}
          ${disabled ? "disabled" : ""}
          ${readonly ? "readonly" : ""}
          type="${type}"
          id="${formId}${field}"
          name="${formId}${field}"
          placeholder="${placeholder}"
        >
${value}</textarea
        >
      </div>
    </li>
  `;
};
export const renderSelect = (
  formId: string,
  { name, field, value, options, placeholder, disabled, readonly }: Field,
  formItemStyle: string,
  formItemLabelStyle: string,
  formItemContentStyle: string,
  formItemSelectStyle: string,
  formItemSelectArrowStyle: string
) => {
  return html`
    <li class="${s.formitem} form_item" ${formItemStyle}>
      <label
        class="${s.formitemlabel} form_item_label"
        for="${formId}${field}"
        ${formItemLabelStyle}
        >${name}</label
      >
      <div
        class="${s.formitemcontent} form_item_content"
        ${formItemContentStyle}
      >
        <select
          ${disabled ? "disabled" : ""}
          ${readonly ? "readonly" : ""}
          class="form_item_select"
          id="${formId}${field}"
          name="${formId}${field}"
          ${formItemSelectStyle}
        >
          <option value="">${placeholder || "请选择"}</option>
          ${options.map(
            (item: Option) => html`
              <option
                value="${item.value}"
                ${item.value === value && "selected"}
              >
                ${item.label}
              </option>
            `
          )}
        </select>
        <div
          class="${s.select__arrow} form_item_select_arrow"
          ${formItemSelectArrowStyle}
        />
      </div>
    </li>
  `;
};

export const renderRadio = (
  formId: string,
  { name, options, field, value, disabled, readonly }: Field,
  formItemStyle?: string,
  formItemLabelStyle?: string,
  formItemContentStyle?: string,
  formItemSubLabelRadioStyle?: string,
  formItemSubRadioDiscStyle?: string,
  formItemSubRadioIndicatorStyle?: string
) => {
  return html`
    <li class="${s.formitem} form_item" ${formItemStyle}>
      <label class="${s.formitemlabel} form_item_label" ${formItemLabelStyle}
        >${name}</label
      >
      <div
        class="${s.formitemcontent} form_item_content"
        ${formItemContentStyle}
      >
        <input
          style="display:none"
          ${disabled ? "disabled" : ""}
          ${readonly ? "readonly" : ""}
          id="${formId}${field}"
          name="${formId}${field}"
          value="${value}"
        />
        ${options.map(
          (item: Option, index: number) => html`
            <label
              class="${s.form_item_sub_label} ${s.form_item_sub_label_radio} form_item_sub_label form_item_sub_label_radio"
              ${formItemSubLabelRadioStyle}
            >
              <input
                class="form_item_sub_radio"
                ${disabled || readonly ? "disabled" : ""}
                type="radio"
                name="${formId}${field}radio"
                id="${formId}${field}${index}"
                ${item.value === value && "checked"}
              />
              <span
                class="${s.form_item_sub_radio_disc} form_item_sub_radio_disc"
                ${formItemSubRadioDiscStyle}
                >${item.label}</span
              >
              <div
                class="${s.control__indicator} form_item_sub_radio_indicator"
                ${formItemSubRadioIndicatorStyle}
              ></div>
            </label>
          `
        )}
      </div>
    </li>
  `;
};

export const renderCheckbox = (
  formId: string,
  { name, field, value, options, disabled, readonly }: Field,
  formItemStyle?: string,
  formItemLabelStyle?: string,
  formItemContentStyle?: string,
  formItemSubLabelCheckboxStyle?: string,
  formItemSubCheckboxDiscStyle?: string,
  formItemSubCheckboxIndicatorStyle?: string
) => {
  return html`
    <li class="${s.formitem} form_item" ${formItemStyle}>
      <label class="${s.formitemlabel} form_item_label" ${formItemLabelStyle}
        >${name}</label
      >
      <div
        class="${s.formitemcontent} form_item_content"
        ${formItemContentStyle}
      >
        <input
          style="display:none"
          ${disabled ? "disabled" : ""}
          ${readonly ? "readonly" : ""}
          id="${formId}${field}"
          name="${formId}${field}"
          value="${value}"
        />
        ${options.map(
          (item: Option, index: number) => html`
            <label
              class="${s.form_item_sub_label} ${s.form_item_sub_label_checkbox} form_item_sub_label form_item_sub_label_checkbox"
            >
              <input
                class="form_item_sub_checkbox"
                ${formItemSubLabelCheckboxStyle}
                type="checkbox"
                ${disabled || readonly ? "disabled" : ""}
                name="${formId}${field}${index}"
                id="${formId}${field}${index}"
                ${value.split(",").includes(item.value) && "checked"}
              />
              <span
                class="${s.form_item_sub_radio_disc} form_item_sub_checkbox_disc"
                ${formItemSubCheckboxDiscStyle}
                >${item.label}</span
              >
              <div
                class="${s.control__indicator} form_item_sub_checkbox_indicator"
                ${formItemSubCheckboxIndicatorStyle}
              ></div>
            </label>
          `
        )}
      </div>
    </li>
  `;
};

export const renderPicker = (
  formId: string,
  { name, field, value, placeholder, disabled, readonly }: Field,
  formItemStyle?: string,
  formItemLabelStyle?: string,
  formItemContentStyle?: string,
  formItemButtonPickerButtonStyle?: string
) => {
  return html`
    <li class="${s.formitem} form_item" ${formItemStyle}>
      <label
        class="${s.formitemlabel} form_item_label"
        for="${formId}${field}"
        ${formItemLabelStyle}
        >${name}</label
      >
      <div
        class="${s.formitemcontent} form_item_content"
        ${formItemContentStyle}
      >
        <button
          type="button"
          class="${s.pickerbutton} form_item_button form_item_button_pickerbutton"
          ${formItemButtonPickerButtonStyle}
          ${readonly || disabled ? "disabled" : ""}
          id="${formId}${field}"
          data-default-value="${value}"
          data-default-display="${placeholder || value}"
          value="${value}"
          data-display="${placeholder || value}"
        >
          ${placeholder || value}
        </button>
      </div>
    </li>
  `;
};

const onChangeCheckbox = (item: Field, form: HTMLFormElement, formId: string) => {
  const valdom: HTMLInputElement = form.querySelector(`#${formId}${item.field}`);
  item.options.forEach((el, i) => {
    const checkbox: HTMLInputElement = form.querySelector(`#${formId}${item.field}${i}`);
    checkbox.onchange = function () {
      const fieldDom: HTMLInputElement = form.querySelector(`#${formId}${item.field}`);
      let tempData: string[] = [];
      if (fieldDom.value) {
        tempData = fieldDom.value.split(",");
      }
      if (checkbox.checked === true) {
        tempData.push(el.value);
      } else {
        tempData = tempData.filter((item) => item !== el.value);
      }
      fieldDom.value = tempData.join(",");
      const val = valdom.value;
      handleValidate(val, item, valdom.parentNode as HTMLDivElement);
    };
  });
};

const onChangeRadio = (item: Field, form: HTMLFormElement, formId: string) => {
  const valdom: HTMLInputElement = form.querySelector(`#${formId}${item.field}`);
  item.options.forEach((el: Option, i: number) => {
    const radio: HTMLInputElement = form.querySelector(`#${formId}${item.field}${i}`);
    radio.onchange = function () {
      if (radio.checked === true) {
        const fieldDom: HTMLInputElement = form.querySelector(`#${formId}${item.field}`);
        fieldDom.value = el.value;
      }
      const val = valdom.value;
      handleValidate(val, item, valdom.parentNode as HTMLDivElement);
    };
  });
};

export const onChangeOther = (item: Field, form: HTMLFormElement, formId: string) => {
  const target: HTMLInputElement = form.querySelector(`#${formId}${item.field}`);
  target.onchange = function (e) {
    const val = (e.target as HTMLInputElement).value;
    handleValidate(val, item, target.parentNode as HTMLDivElement);
  };
};

const handlePicker = (item: Field, form: HTMLFormElement, style: any, formId: string) => {
  const target: HTMLInputElement = form.querySelector(`#${formId}${item.field}`);
  const wheels: any = item.options;
  const keyMap: any = item.keyMap;
  const cancelBtnText: string = item.cancelBtnText;
  const confirmBtnText: string = item.confirmBtnText;
  const title: string = item.title;
  const parames: pickerOption<{
    display: "date";
    value: "val";
  }> = {
    wheels,
    trigger: `#${form.id}${item.field}`,
    keyMap,
    cancelBtnText,
    confirmBtnText,
    title,
    style,
    onConfirm: (data) => {
      if (!item.keyMap?.value) {
        target.value = data.join(",");
        target.innerText = data.join(item.splitSymbol);
        target.setAttribute("data-display", target.innerText);
        handleValidate(target.value, item, target.parentNode as HTMLDivElement);
        return;
      }
      target.value = data.map((el) => el[item.keyMap.value]).join(",");
      target.innerText = data
        .map((el) => el[item.keyMap.display])
        .join(item.splitSymbol);
      target.setAttribute("data-display", target.innerText);
      handleValidate(target.value, item, target.parentNode as HTMLDivElement);
    },
  };
  const datePicker = new Picker(parames);
  window[item.field] = datePicker;
  target.onclick = (e) => {
    e.preventDefault();
    target.blur();
    let dataValue: any[] = (e.target as HTMLInputElement).value.split(",");
    if (!item.keyMap?.value) {
      if (typeof item.options[0].data[0] === "number") {
        dataValue = dataValue.map((i) => parseInt(i));
      }
    } else {
      if (typeof item.options[0].data[0][item.keyMap.value] === "number") {
        dataValue = dataValue.map((i) => parseInt(i));
      }
    }
    datePicker.showPicker(dataValue);
  };

  return datePicker; 
};
