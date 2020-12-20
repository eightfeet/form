import createForm from "./template";
import { Field } from "./../types/data";

export interface FormOptions {
    /**form id */
    id?: string;
    /**form 父级id */
    parentId?: string;
    /**基准字体大小 */
    emBase?: number;
    /**表单字段 */
    fields?: Field[];
    /**提交 */
    onSubmit?: (data: { [keys: string]: any }) => void;
    /**重置 */
    onReset?: () => void;
    /**表单标题 */
    formTitle?: string;
    /**提交按钮文字 */
    submitText?: string;
    /**重置按钮文字 */
    resetText?: string;
  }

class Form {
  pickers: any[];
  id: string;
  parentId: string;
  emBase: number;
  formTitle: string;
  submitText: string;
  resetText: string;
  constructor({
  	id,
  	parentId,
  	emBase,
  	fields,
  	onSubmit,
  	onReset,
  	formTitle,
  	submitText,
  	resetText
  }: FormOptions) {
  	const stamp = `${new Date().getTime()}${window.Math.floor(
  		window.Math.random() * 100
  	)}`;
  	this.id = id || stamp;
  	this.parentId = parentId;
  	this.emBase = emBase;
  	this.formTitle = formTitle;
  	this.submitText = submitText;
  	this.resetText = resetText;
  	this.initForm(fields, onSubmit, onReset, {
  		formTitle,
  		submitText,
  		resetText
  	});
  }

  initForm = (
  	fields: Field[],
  	onSubmit?: (data: { [keys: string]: any }) => void,
  	onReset?: () => void,
  	text?: {
      [keys: string]: string;
    }
  ) => {
  	createForm({
  		parentId: this.parentId,
  		title: text.formTitle,
  		submitText: text?.submitText,
  		resetText: text?.resetText,
  		id: this.id,
  		fields,
  		emBase: this.emBase,
  		style: {
  			formItemSubCheckboxIndicator: {},
  			formPicker: {
  				overlay: {
  					background: "rgba(255, 0, 0, 0.4)"
  				},
  				title: {
  					color: "green"
  				}
  			}
  		},
  		onSubmit,
  		onReset
  	}).then(({ pickers }) => {
  		this.pickers = pickers;
  	});
  };

  destroy = () => {
  	const formDom: HTMLElement = document.getElementById(`form${this.id}`);
  	const formRoot: HTMLElement =
      document.getElementById(this.parentId) || document.body;
  	formDom && formRoot.removeChild(formDom);
  	if (this.pickers?.length > 0) {
  		this.pickers.forEach((element) => {
        element?.destroy();
  		});
  		this.pickers = [];
  	}
  };
}

export default Form;
