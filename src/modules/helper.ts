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
