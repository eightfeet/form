import createForm from "./template";
import { Filed } from "~/types/data";


import { fields } from "./data";

class Form {
  pickers: any[];
  id: string;
  parentId: string;
  emBase: number;
  constructor({
    id,
    parentId,
    emBase,
    fields,
  }: {
    id?: string;
    parentId?: string;
    emBase?: number;
    fields?: Filed[]
  }) {
    const stamp = `${new Date().getTime()}${window.Math.floor(
      window.Math.random() * 100
    )}`;
    this.id = id || stamp;
    this.parentId = parentId;
    this.emBase = emBase;
    this.initForm(fields);
  }

  initForm = (fields: Filed[]) => {
    createForm({
      parentId: this.parentId,
      title: "表单标题",
      id: this.id,
      fields,
      emBase: this.emBase,
      style: {
        formItemSubCheckboxIndicator: {},
        formPicker: {
          overlay: {
            background: "rgba(255, 0, 0, 0.4)",
          },
          title: {
            color: "green",
          },
        },
      },
      onSubmit: (data) => {
        console.log("data", data);
      },
      onReset: () => {
        console.log("reset");
      },
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

    console.log("this.pickers", this.pickers);
  };
}

(window as any).aaa = new Form({
  fields
});

export default Form;
