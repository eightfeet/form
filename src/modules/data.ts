
import { Filed } from '~/types/data';

export const fields: Filed[] = [
    {
      name: "姓名1",
      field: "name1",
      value: "name value1",
      type: "tel",
    },
    {
      name: "姓名2",
      field: "name2",
      value: "name value2",
    },
    {
      name: "姓名3",
      field: "name3",
      value: "1,3",
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