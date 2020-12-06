import s from "./form.scss";
import { html } from "common-tags";
import { checkType } from "./../helper";
import { Filed, FieldType, Option } from "~/types/data";

export default ({
  id,
  parentId,
  fields,
  onSubmit,
}: {
  id: string;
  parentId?: string;
  fields: Filed[];
  onSubmit: (data: { [keys: string]: any }) => void;
}) => {
  const rootDom = document.getElementById(parentId) || document.body;
  // 检查数据
  checkType(fields, "Array", "fields");

  // 创建内容
  const htmlString = html`
    <ul>
      ${fields.map((item) => render(item))}
      <li><input type="submit" value="Submit!" /></li>
      <li><input type="reset" value="Reset!" /></li>
    </ul>
  `;
  // 创建form
  const form = document.createElement("form");
  form.id = `form${id}`;
  form.classList.add(s.form);
  form.innerHTML = htmlString;
  rootDom.appendChild(form);
  
  // 绑定事件
  fields.forEach((item) => {
    if (item.type === FieldType.Checkbox) {
      onChangeCheckbox(item, form);
    }

    if (item.type === FieldType.Radio) {
      onChangeRadio(item, form);
    }
  });

  form.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const result = {};
    fields.forEach((element) => {
      const data = formData.get(element.field);
      result[element.field] = data;
    });
    onSubmit(result);
  };
};

export const render = (config: Filed) => {
  switch (config.type) {
    case FieldType.Radio:
      return renderRadio(config);
    case FieldType.Checkbox:
      return renderCheckbox(config);
    default:
      return renderInput(config);
  }
};

export const renderInput = ({ name, field, value, type }: Filed) => {
  return html`
    <li>
      <label for="${field}">${name}:</label>
      <input type="${type}" id="${field}" name="${field}" value="${value}" />
    </li>
  `;
};

export const renderRadio = ({ name, options, field, value }: Filed) => {
  return html`
    <li>
      <span>${name}:</span>
      <div>
        <input type="hidden" id="${field}" name="${field}" value="${value}" />
        ${options.map(
          (item: Option, index: number) => html`
            <label>
              <input
                type="radio"
                name="${field}radio"
                id="${field}${index}"
                ${item.value === value && "checked"}
              />
              <span>${item.label}</span>
            </label>
          `
        )}
      </div>
    </li>
  `;
};

export const renderCheckbox = ({ name, field, value, options }: Filed) => {
  return html`
    <li>
      <span>${name}:</span>
      <div>
        <input type="hidden" id="${field}" name="${field}" value="${value}" />
        ${options.map(
          (item: Option, index: number) => html`
            <label>
              <input
                type="checkbox"
                name="${field}${index}"
                id="${field}${index}"
                ${value.split(",").includes(item.value) && "checked"}
              />
              <span>${item.label}</span>
            </label>
          `
        )}
      </div>
    </li>
  `;
};

const onChangeCheckbox = (item, form: HTMLFormElement) => {
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
    };
  });
};

const onChangeRadio = (item, form: HTMLFormElement) => {
  item.options.forEach((el: { name: string; value: string }, i: number) => {
    const radio: HTMLInputElement = form.querySelector(`#${item.field}${i}`);
    radio.onchange = function () {
      if (radio.checked === true) {
        const fieldDom: HTMLInputElement = form.querySelector(`#${item.field}`);
        fieldDom.value = el.value;
        return;
      }
    };
  });
};
