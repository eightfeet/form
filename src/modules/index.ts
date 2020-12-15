import createForm from "./template";

import { fields } from "./data";

class Form {
  constructor({ id, parentId, }: { id?: string, parentId?: string }) {
    const stamp = `${new Date().getTime()}${window.Math.floor(window.Math.random()*100)}`;
    this.initForm(id || stamp, parentId);
  }

  initForm = (id: string, parentId?: string) => {
    createForm({
       parentId,
       title: "表单标题",
      id,
      fields,
      onSubmit: (data) => {
        console.log("data", data);
      },
      onReset: () => {
        console.log('reset')
      }
    });
  };
}

new Form({});

export default Form;
