import createForm from "./template";

import { fields } from "./data";

class Form {
	pickers: any[];
	id: string;
	parentId: string;
	constructor({ id, parentId }: { id?: string; parentId?: string }) {
		const stamp = `${new Date().getTime()}${window.Math.floor(
			window.Math.random() * 100
		)}`;
		this.id = id || stamp;
		this.parentId = parentId;
		this.initForm();
	}

  initForm = () => {
  	createForm({
  		parentId: this.parentId,
  		title: "表单标题",
  		id: this.id,
  		fields,
  		style: {
			  formItemSubCheckboxIndicator:{},
			  formPicker:{
				  overlay: {
					  background: "rgba(255, 0, 0, 0.4)"
				  },
				  title: {
					  color: "green"
				  }
			  }
  		},
  		onSubmit: (data) => {
  			console.log("data", data);
  		},
  		onReset: () => {
  			console.log("reset");
  		}
	  }).then(({pickers}) => {
		  this.pickers = pickers;
	  });
	  
  };
	
	destory = () => {
		const formDom:HTMLElement = document.getElementById(`form${this.id}`);
		const formRoot:HTMLElement = document.getElementById(this.parentId) || document.body;
		formRoot.removeChild(formDom);
		if (this.pickers?.length > 0) {
			this.pickers.forEach(element => {
				console.log(element);
			});
		}
	}
}

const aaa = new Form({});
aaa.destory();

export default Form;
