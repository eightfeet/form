import { Field } from "~/types/data";

const times = require("./times.json");

export const fields: Field[] = [
	{
		name: "姓名1",
		field: "name10",
		value: "13622809420",
		type: "file",
		accept: ".jpg",
		placeholder: "请输入姓名",
		validate: {
			VRequire: {
				length: 3
			}
		}
	},
	{
		name: "姓名1",
		field: "name1",
		value: "13622809420",
		type: "tel",
		maxlength: "11",
		placeholder: "请输入姓名",
		validate: {
			VPhone: {
				strict: true
			},
			VRequire: {
				length: 3
			},
			VDangerousChar: {}
		}
	},
	{
		name: "姓名8",
		field: "name8",
		value: "",
		type: "textarea",
		placeholder: "请输入姓名",
		validate:{
			VRequire: {},
			VDangerousChar: {
				Msg: '非规范字符'
			}
		}
	},
	{
		name: "姓名6",
		validate: {
			VRequire: {
				Msg: "姓名6"
			}
		},
		value: "123",
		field: "name6",
		type: "picker",
		splitSymbol: ":",
		placeholder: "1日:5时:25分",
		cancelBtnText: "取消",
		confirmBtnText: "确定",
		title: "json类型",
		keyMap: { display: "date", value: "val", childs: "childs" },
		options: [
			{
				data: [times]
			}
		]
	},
	{
		name: "姓名2",
		field: "name2",
		value: "name value2",
		type: "text"
	},
	{
		name: "姓名5",
		field: "name5",
		value: "1,2",
		validate: {
			VRequire: {
				length: 1,
				Msg: "选择一个名字"
			}
		},
		type: "checkbox",
		options: [
			{
				label: "a",
				value: "1"
			},
			{
				label: "b",
				value: "2"
			},
			{
				label: "c",
				value: "3"
			}
		]
	},
	{
		name: "姓名7",
		field: "name7",
		value: "3",
		type: "picker",
		placeholder: "周三",
		keyMap: { display: "date", value: "val" },
		cancelBtnText: "取消",
		confirmBtnText: "确定",
		title: "时间",
		options: [
			{
				data: [
					{ val: 0, date: "周日" },
					{ val: 1, date: "周一" },
					{ val: 2, date: "周二" },
					{ val: 3, date: "周三" },
					{ val: 4, date: "周四" },
					{ val: 5, date: "周五" },
					{ val: 6, date: "周六" }
				]
			}
		]
	},
	{
		name: "姓名3",
		field: "name3",
		value: "1",
		// disabled: true,
		placeholder: "请选择地址",
		validate: {
			VRequire: {
				length: 1,
				Msg: "选择一个名字"
			}
		},
		type: "select",
		options: [
			{
				label: "a",
				value: "1"
			},
			{
				label: "b",
				value: "2"
			},
			{
				label: "c",
				value: "3"
			}
		]
	},
	{
		name: "姓名4",
		field: "name4",
		value: "1",
		type: "radio",
		validate: {
			VRequire: {
				length: 1,
				Msg: "选择姓名4"
			}
		},
		options: [
			{
				label: "a",
				value: "1"
			},
			{
				label: "b",
				value: "2"
			},
			{
				label: "c",
				value: "3"
			}
		]
	}
];
