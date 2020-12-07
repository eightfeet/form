import s from './form.scss';
import { html } from 'common-tags';
import { checkType } from './../helper';
import { Filed, FieldType, Option } from '~/types/data';
import Picker, { Option as pickerOption } from '@eightfeet/picker';

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
    checkType(fields, 'Array', 'fields');

    // 创建内容
    const htmlString = html`
        <ul>
            ${fields.map((item) => render(item))}
            <li><input type="submit" value="Submit!" /></li>
            <li><input type="reset" value="Reset!" /></li>
        </ul>
    `;
    // 创建form
    const form = document.createElement('form');
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
        fields.forEach(({field, type}) => {
            if (type === FieldType.Picker) {
              result[field] = (document.getElementById(field) as HTMLInputElement).value;
            } else {
              const data = formData.get(field);
              result[field] = data;
            }
        });
        onSubmit(result);
    };

    form.onreset = (e) => {
      fields.forEach(({field, type}) => {
        if (type === FieldType.Picker) {
          const fieldDOM = document.getElementById(field) as HTMLButtonElement;
          fieldDOM.innerText = fieldDOM.value = fieldDOM.getAttribute('data-default-value');
        }
    });
    }
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
            <input
                type="${type}"
                id="${field}"
                name="${field}"
                value="${value}"
            />
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
                        <option
                            value="${item.value}"
                            ${item.value === value && 'selected'}
                        >
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
                                ${item.value === value && 'checked'}
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
                                ${value.split(',').includes(item.value) &&
                                'checked'}
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
            <button id="${field}" data-default-value="${value}" value="${value}">${value}</button>
        </li>
    `;
};

const onChangeCheckbox = (item: Filed, form: HTMLFormElement) => {
    item.options.forEach((el, i) => {
        const checkbox: HTMLInputElement = form.querySelector(
            `#${item.field}${i}`
        );
        checkbox.onchange = function () {
            const fieldDom: HTMLInputElement = form.querySelector(
                `#${item.field}`
            );
            let tempData: string[] = [];
            if (fieldDom.value) {
                tempData = fieldDom.value.split(',');
            }
            if (checkbox.checked === true) {
                tempData.push(el.value);
            } else {
                tempData = tempData.filter((item) => item !== el.value);
            }
            fieldDom.value = tempData.join(',');
        };
    });
};

const onChangeRadio = (item: Filed, form: HTMLFormElement) => {
    item.options.forEach((el: Option, i: number) => {
        const radio: HTMLInputElement = form.querySelector(
            `#${item.field}${i}`
        );
        radio.onchange = function () {
            if (radio.checked === true) {
                const fieldDom: HTMLInputElement = form.querySelector(
                    `#${item.field}`
                );
                fieldDom.value = el.value;
                return;
            }
        };
    });
};

const handlePicker = (item: Filed, form: HTMLFormElement) => {
    const target: HTMLInputElement = form.querySelector(`#${item.field}`);
    console.log(item.options);
    const wheels: any = item.options;
    const parames: pickerOption<{
        display: 'date';
        value: 'val';
    }> = {
        wheels,
        trigger: `#${item.field}`,
        keyMap: { display: 'date', value: 'val', childs: 'childs' },
        cancelBtnText: '取消',
        confirmBtnText: '确定',
        title: 'json类型',
        onConfirm: data => {
          target.value = data.map(el => el.val).join(',');
          target.innerText = target.value;
        },
    };
    const datePicker = new Picker(parames);
    target.onclick = (e) => {
        target.blur();
        // 如何定义数据类型 ？？？？？？？？？？
        const dataValue = (e.target as HTMLInputElement).value.split(',');
        const selected = dataValue.map((i) => parseInt(i));
        datePicker.showPicker(selected);
    };
};
