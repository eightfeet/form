/**
 * 设置dom的font-size，用于控制子元素的em基准单位，pc端时 font-size = 16px，
 * 如果有emBase传入直接使用emBase为基准字体大小
 * 其他按规则计算字体值（屏幕宽度:UI宽度 = 屏幕字体大小:UI字体大小）
 * @param {HTMLElement} dom
 * @param {String} parentId
 * @param {Number} emBase
 * @returns
 */
declare function setEmBase(dom: HTMLElement, parentId: string, emBase: number): void;
export default setEmBase;
