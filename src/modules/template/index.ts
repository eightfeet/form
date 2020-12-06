import s from "./form.scss";
import { html } from "common-tags";
import { checkType } from "./../helper";
import { Filed, FieldType, Option } from "~/types/data";
import Picker, {Option as pickerOption, Wheels} from "@eightfeet/picker";

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
  fields.forEach((item: Filed) => {
    if (item.type === FieldType.Checkbox) {
      onChangeCheckbox(item, form);
    }

    if (item.type === FieldType.Radio) {
      onChangeRadio(item, form);
    }

    if (item.type === FieldType.Picker) {
      handlePicker(item, form);
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
    case FieldType.Select:
      return renderSelect(config);
    case FieldType.Picker:
      return renderPicker(config);
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

export const renderSelect = ({ name, field, value, options }: Filed) => {
  return html`
    <li>
      <label for="${field}">${name}:</label>
      <select name="${field}">
        <option>请选择</option>
        ${options.map(
          (item: Option, index: number) => html`
            <option value="${item.value}" ${item.value === value && "selected"}>
              ${item.label}
            </option>
          `
        )}
      </select>
    </li>
  `;
};

export const renderRadio = ({ name, options, field, value }: Filed) => {
  return html`
    <li>
      <span>${name}:</span>
      <div>
        <input
          style="display:none"
          id="${field}"
          name="${field}"
          value="${value}"
        />
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
        <input
          style="display:none"
          id="${field}"
          name="${field}"
          value="${value}"
        />
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

export const renderPicker = ({ name, field, value, type }: Filed) => {
  return html`
    <li>
      <label for="${field}">${name}:</label>
      <input readyonly id="${field}" name="${field}" value="${value}" />
    </li>
  `;
};

const onChangeCheckbox = (item: Filed, form: HTMLFormElement) => {
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

const onChangeRadio = (item: Filed, form: HTMLFormElement) => {
  item.options.forEach((el: Option, i: number) => {
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

const handlePicker = (item: Filed, form: HTMLFormElement) => {
  const target: HTMLInputElement = form.querySelector(`#${item.field}`);
  const wheels: Wheels<{
    display: 'date',
    value: 'val'
  }> = [
    {
        data: [
            { val: 0, date: '周日' },
            { val: 1, date: '周一' },
            { val: 2, date: '周二' },
            { val: 3, date: '周三' },
            { val: 4, date: '周四' },
            { val: 5, date: '周五' },
            { val: 6, date: '周六' }
        ]
    },
    {
        data: [
            { val: 8, date: '08:00' },
            { val: 9, date: '09:00' },
            { val: 10, date: '10:00' },
            { val: 11, date: '11:00' },
            { val: 12, date: '12:00' },
            { val: 13, date: '13:00' },
            { val: 14, date: '14:00' }
        ]
    }
];
  const parames: pickerOption = {
    wheels,
    trigger: `#${item.field}`,
    keyMap: { display: 'date', value: 'val'},
    cancelBtnText: 'cancel',
    confirmBtnText: 'ensure',
    title: 'json类型',
    style: {
        wrap: {
            color: '#444'
        },
        mask: {
            height: '50em'
        }
    }
}
  

  const datePicker = new Picker(parames);
  target.onclick = () => {
    target.blur();
    datePicker.showPicker([2,9]);
    console.log(22222);
  };
};
