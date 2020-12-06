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
      id,
      fields,
      onSubmit: (data) => {
        console.log("data", data);
      },
    });
  };

  submit = () => {};

  reset = () => {};
}

new Form({});

export default Form;
