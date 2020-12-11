import { Filed } from "~/types/data";

const times =  require('./times.json')

export const fields: Filed[] = [
  {
    name: "姓名1",
    field: "name1",
    value: "name value1",
    type: "tel",
  },
  {
    name: "姓名6",
    field: "name6",
    value: "1,22,50",
    type: "picker",
    splitSymbol: ":",
    defaultDisplay: "1日:22时:10分",
    cancelBtnText: "取消",
    confirmBtnText: "确定",
    title: "json类型",
    keyMap: { display: "date", value: "val", childs: 'childs' },
    options: [
      {
        data: [
            times,
        ],
      },
    ],
  },
  {
    name: "姓名2",
    field: "name2",
    value: "name value2",
  },
  {
    name: "姓名5",
    field: "name5",
    value: "1,2",
    type: "checkbox",
    options: [
      {
        label: "a",
        value: "1",
      },
      {
        label: "b",
        value: "2",
      },
      {
        label: "c",
        value: "3",
      },
    ],
  },
  {
    name: "姓名7",
    field: "name7",
    value: "3",
    type: "picker",
    keyMap: { display: "date", value: "val" },
    cancelBtnText: "取消",
    confirmBtnText: "确定",
    title: "时间",
    defaultDisplay: "周三",
    options: [
      {
        data: [
          { val: 0, date: "周日" },
          { val: 1, date: "周一" },
          { val: 2, date: "周二" },
          { val: 3, date: "周三" },
          { val: 4, date: "周四" },
          { val: 5, date: "周五" },
          { val: 6, date: "周六" },
        ],
      },
    ],
  },
  {
    name: "姓名3",
    field: "name3",
    value: "2",
    type: "select",
    options: [
      {
        label: "a",
        value: "1",
      },
      {
        label: "b",
        value: "2",
      },
      {
        label: "c",
        value: "3",
      },
    ],
  },
  {
    name: "姓名4",
    field: "name4",
    value: "2",
    type: "radio",
    options: [
      {
        label: "a",
        value: "1",
      },
      {
        label: "b",
        value: "2",
      },
      {
        label: "c",
        value: "3",
      },
    ],
  },
];
