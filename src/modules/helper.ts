import { Filed } from "~/types/data";
import validate from "./validate";
import s from './template/form.scss'

export const checkType = (
  data: any,
  Type: "Array" | "String" | "Object",
  tag?: string
) => {
  let fieldsType: string = Object.prototype.toString.call(data);
  fieldsType = fieldsType.split(" ")[1];
  fieldsType = fieldsType.slice(0, fieldsType.length - 1);

  if (fieldsType !== Type) {
    throw new Error(
      `Invalid${tag ? ` ${tag}` : ""} expected ${
        Type === "Array" ? `an` : "a"
      } ${Type} but was ${fieldsType === "Array" ? `an` : "a"} ${fieldsType}`
    );
  }
};

export const removeErrorDom = (dom: HTMLDivElement) => {
  const errdom = dom.querySelector(`.${s.formvalidateerror}`);
  if (errdom) {
    dom.removeChild(errdom);
  }
}


export const handleValidate = (
  val: string,
  item: Filed,
  dom: HTMLDivElement
):boolean => {
  if (Object.prototype.toString.call(item.validate) !== "[object Object]") {
    return true;
  }
  removeErrorDom(dom)
  const checkData = {};
  Object.keys(item.validate).forEach((el) => {
    const element = item.validate[el];
    const result = [val];
    result.push(element.Msg || null);

    if (el === "VEqual" && element.comparator) {
      result.push(element.comparator);
    }

    switch (el) {
      case "VPhone":
        if (element.strict === true) {
          result.push("strict");
        }
        break;
      case "VName":
        if (element.Zh === true) {
          result.push("Zh");
        }
        break;
      case "VRequire":
      case "VLimit":
        if (element.length) {
          result.push(element.length);
        }
        break;
      default:
        break;
    }
    checkData[`${el}_${item.field}`] = result;
  });

  const error = validate(checkData);

  if (error) {
    const div = document.createElement('div');
    div.innerText = error;
		div.classList.add(s.formvalidateerror);
		div.classList.add('form_error_info');
    dom.appendChild(div);
    return false;
  }
  return true;
};
