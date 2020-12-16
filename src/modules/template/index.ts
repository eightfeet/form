import s from "./form.scss";
import { html } from "common-tags";
import { checkType, handleValidate, removeErrorDom } from "./../helper";
import { Filed, FieldType, Option } from "~/types/data";
import Picker, { Option as pickerOption } from "@eightfeet/picker";

export default async ({
  id,
  parentId,
  title,
  fields,
  onSubmit,
  onReset,
}: {
  id: string;
  parentId?: string;
  title?: string;
  fields: Filed[];
  onSubmit: (data: { [keys: string]: any }) => void;
  onReset: () => void;
}) => {
  const rootDom = document.getElementById(parentId) || document.body;
  // 检查数据
  checkType(fields, "Array", "fields");

  // 创建内容
  const htmlString = html`
    ${title ? html`<h3 class="${s.title} form_title">${title}</h3>` : ""}
    <ul class="${s.wrap} form_worp">
      ${fields.map((item) => render(item))}
    </ul>
    <ul class="${s.formbuttonwrap} form_button_wrap">
      <li class=" ${s.formbutton} ${s.formsubmit} form_submit form_button">
        <button type="submit" >提交</button>
      </li>
      <li class=" ${s.formbutton} ${s.formreset} form_reset form_button">
        <button type="reset" >重置</button>
      </li>
    </ul>
  `;
  // 创建form
  const form = document.createElement("form");
  form.id = `form${id}`;
  form.classList.add(s.form);
  form.innerHTML = htmlString;
  rootDom.appendChild(form);
  // 绑定事件
  fields.forEach((item: Filed) => {
    switch (item.type) {
      case FieldType.Checkbox:
        onChangeCheckbox(item, form);
        break;
      case FieldType.Radio:
        onChangeRadio(item, form);
        break;
      case FieldType.Picker:
        handlePicker(item, form);
        break;

      default:
        onChangeOther(item, form);
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
      const valdom = document.getElementById(field) as HTMLInputElement;
      console.log('field', disabled)
      if (type === FieldType.Picker && !disabled) {
        result[field] = valdom.value;
      } else {
        const data = formData.get(field);
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
    onSubmit(result);
  };

  form.onreset = (e) => {
    fields.forEach(({ field, type }) => {
      const fieldDOM = document.getElementById(field) as HTMLButtonElement;
      if (type === FieldType.Picker) {
        const defaultVal = fieldDOM.getAttribute("data-default-value");
        const defaultText = fieldDOM.getAttribute("data-default-display");
        fieldDOM.value = defaultVal;
        fieldDOM.innerText = defaultText;
      }
      removeErrorDom(fieldDOM.parentNode as HTMLDivElement);
    });
    onReset();
  };
};

export const render = (config: Filed) => {
  switch (config.type) {
    case FieldType.Radio:
      return renderRadio(config);
    case FieldType.Checkbox:
      return renderCheckbox(config);
    case FieldType.Select:
      return renderSelect(config);
    case FieldType.Picker:
      return renderPicker(config);
    case FieldType.Textarea:
      return renderTextarea(config);
    default:
      return renderInput(config);
  }
};

export const renderInput = ({
  name,
  field,
  value,
  type,
  placeholder,
  disabled,
  readonly,
  maxlength
}: Filed) => {
  return html`
    <li class="${s.formitem} form_item">
      <label class="${s.formitemlabel} form_item_label" for="${field}"
        >${name}</label
      >
      <div class="${s.formitemcontent} form_item_content">
        <input
          class="form_item_text"
          ${disabled ? "disabled" : ""}
          ${readonly ? "readonly" : ""}
          ${maxlength ? `maxlength="${maxlength}"` : ''}
          type="${type}"
          id="${field}"
          name="${field}"
          value="${value}"
          placeholder="${placeholder}"
        />
      </div>
    </li>
  `;
};

export const renderTextarea = ({
  name,
  field,
  value,
  type,
  placeholder,
  disabled,
  readonly
}: Filed) => {
  return html`
    <li class="${s.formitem} form_item">
      <label class="${s.formitemlabel} form_item_label" for="${field}"
        >${name}</label
      >
      <div class="${s.formitemcontent} form_item_content">
        <textarea
          class="form_item_textarea"
          ${disabled ? "disabled" : ""}
          ${readonly ? "readonly" : ""}
          type="${type}"
          id="${field}"
          name="${field}"
          placeholder="${placeholder}"
        >${value}</textarea>
      </div>
    </li>
  `;
};
export const renderSelect = ({
  name,
  field,
  value,
  options,
  placeholder,
  disabled,
  readonly
}: Filed) => {
  return html`
    <li class="${s.formitem} form_item">
      <label class="${s.formitemlabel} form_item_label" for="${field}"
        >${name}</label
      >
      <div class="${s.formitemcontent} form_item_content">
        <select
          ${disabled ? "disabled" : ""}
          ${readonly ? "readonly" : ""}
          class="form_item_select"
          id="${field}"
          name="${field}"
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
        <div class="${s.select__arrow}" />
      </div>
    </li>
  `;
};

export const renderRadio = ({ name, options, field, value, disabled, readonly }: Filed) => {
  return html`
    <li class="${s.formitem} form_item">
      <label class="${s.formitemlabel} form_item_label">${name}</label>
      <div class="${s.formitemcontent} form_item_content">
        <input
          style="display:none"
          ${disabled ? 'disabled' : ''}
          ${readonly ? "readonly" : ""}
          id="${field}"
          name="${field}"
          value="${value}"
        />
        ${options.map(
          (item: Option, index: number) => html`
            <label class="${s.form_item_sub_label} ${s.form_item_sub_label_radio} form_item_sub_label form_item_sub_label_radio">
              <input
                class="form_item_sub_radio"
                ${(disabled || readonly) ? 'disabled' : ''}
                
                type="radio"
                name="${field}radio"
                id="${field}${index}"
                ${item.value === value && "checked"}
              />
              <span class="${s.form_item_sub_radio_disc} form_item_sub_radio_disc">${item.label}</span>
              <div class="${s.control__indicator}" ></div>
            </label>
          `
        )}
      </div>
    </li>
  `;
};

export const renderCheckbox = ({ name, field, value, options, disabled, readonly }: Filed) => {
  return html`
    <li class="${s.formitem} form_item">
      <label class="${s.formitemlabel} form_item_label">${name}</label>
      <div class="${s.formitemcontent} form_item_content">
        <input
          style="display:none"
          ${disabled ? 'disabled' : ''}
          ${readonly ? "readonly" : ""}
          id="${field}"
          name="${field}"
          value="${value}"
        />
        ${options.map(
          (item: Option, index: number) => html`
            <label class="${s.form_item_sub_label} ${s.form_item_sub_label_checkbox} form_item_sub_label form_item_sub_label_checkbox">
              <input
                class="form_item_sub_checkbox"
                type="checkbox"
                ${disabled || readonly ? 'disabled' : ''}
                name="${field}${index}"
                id="${field}${index}"
                ${value.split(",").includes(item.value) && "checked"}
              />
              <span class="${s.form_item_sub_radio_disc} form_item_sub_checkbox_disc">${item.label}</span>
              <div class="${s.control__indicator}" ></div>
            </label>
          `
        )}
      </div>
    </li>
  `;
};

export const renderPicker = ({
  name,
  field,
  value,
  placeholder,
  type,
  disabled,
  readonly
}: Filed) => {
  return html`
    <li class="${s.formitem} form_item">
      <label class="${s.formitemlabel} form_item_label" for="${field}"
        >${name}</label
      >
      <div class="${s.formitemcontent} form_item_content">
        <button
          type="button"
          class="form_item_button ${s.pickerbutton}"
          ${readonly || disabled ? 'disabled' : ''}
          id="${field}"
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

const onChangeCheckbox = (item: Filed, form: HTMLFormElement) => {
  const valdom: HTMLInputElement = form.querySelector(`#${item.field}`);
  item.options.forEach((el, i) => {
    const checkbox: HTMLInputElement = form.querySelector(`#${item.field}${i}`);
    checkbox.onchange = function () {
      const fieldDom: HTMLInputElement = form.querySelector(`#${item.field}`);
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

const onChangeRadio = (item: Filed, form: HTMLFormElement) => {
  const valdom: HTMLInputElement = form.querySelector(`#${item.field}`);
  item.options.forEach((el: Option, i: number) => {
    const radio: HTMLInputElement = form.querySelector(`#${item.field}${i}`);
    radio.onchange = function () {
      if (radio.checked === true) {
        const fieldDom: HTMLInputElement = form.querySelector(`#${item.field}`);
        fieldDom.value = el.value;
      }
      const val = valdom.value;
      handleValidate(val, item, valdom.parentNode as HTMLDivElement);
    };
  });
};

export const onChangeOther = (item: Filed, form: HTMLFormElement) => {
  const target: HTMLInputElement = form.querySelector(`#${item.field}`);
  target.onchange = function (e) {
    const val = (e.target as HTMLInputElement).value;
    handleValidate(val, item, target.parentNode as HTMLDivElement);
  };
};

const handlePicker = (item: Filed, form: HTMLFormElement) => {
  const target: HTMLInputElement = form.querySelector(`#${item.field}`);
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
    trigger: `#${item.field}`,
    keyMap,
    cancelBtnText,
    confirmBtnText,
    title,
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
};
