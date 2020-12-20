/**
 * 验证手机，data: 手机号码，strict: 当第三个参数设为'strict'时开启严格验证，不填时只验证已1开头的11位手机号码
 * @param {(string | number)} data 电话号码
 * @param {string} Msg 失败信息
 * @param {'strict'} strict 严格验证模式，非严格只验证1开头11位数字
 * @return {*}  {(string | false)} 返回错误信息(验证失败)或false(验证通过)
 */
export declare function VPhone(data: string | number, Msg: string, strict: 'strict'): string | false;
/**
 * validate the name
 * @export
 * @param {(string | number)} name
 * @param {string} Msg
 * @param {'Zh'} Zh
 * @return {*}  {(string | false)} 返回错误信息(验证失败)或false(验证通过)
 */
export declare function VName(name: string | number, Msg: string, Zh: 'Zh'): string | false;
/**
 *
 * 验证email
 * @export
 * @param {string} email
 * @param {string} Msg 错误信息
 * @return {*}  {(string | false)} 返回错误信息(验证失败)或false(验证通过)
 */
export declare function VEmail(email: string, Msg: string): string | false;
/**
 *
 * 身份证验证
 * @export
 * @param {(string| number)} data
 * @param {string} Msg
 * @return {*}  {(string | false)}
 */
export declare function VIdCard(data: string | number, Msg: string): string | false;
/**
 * 验证码验证
 * @export
 * @param {(string | number)} data 验证码
 * @param {string} Msg
 * @param {number} length 验证码长度
 * @return {*}  {(false | string)}
 */
export declare function VVerificationCode(data: string | number, Msg: string, length: number): false | string;
/**
 * 验证字符必填（长度）
 * @export
 * @param {(string|number)} data
 * @param {string} Msg
 * @param {number} length
 * @return {*}  {(boolean|string)}
 */
export declare function VRequire(data: string | number, Msg: string, length: number): boolean | string;
/**
 * 验证最少字符串
 * @export
 * @param {(string|number)} data
 * @param {string} Msg
 * @param {number} length
 * @return {*}  {(boolean | string)}
 */
export declare function VLimit(data: string | number, Msg: string, length: number): boolean | string;
/**
 * 验证数字
 * @export
 * @param {(string|number)} data
 * @param {string} Msg
 * @return {*}  {(boolean | string)}
 */
export declare function VNumber(data: string | number, Msg: string): boolean | string;
/**
 * 验证中文
 * @export
 * @param {(string | number)} data
 * @param {string} Msg
 * @return {*}  {(boolean|string)}
 */
export declare function VChinese(data: string | number, Msg: string): boolean | string;
/**
 * 验证英文
 * @export
 * @param {(string|number)} data
 * @param {string} Msg
 * @return {*}  {(boolean | string)}
 */
export declare function VEnglish(data: string | number, Msg: string): boolean | string;
/**
 * 数据比较
 * @export
 * @param {string} dataA 比较数据A
 * @param {string} dataB 比较数据B
 * @param {string} Msg
 * @param {boolean} turnOver false 时比较两个数据不相等
 * @return {*}  {(boolean | string)}
 */
export declare function VEqual(dataA: string, dataB: string, Msg: string, turnOver: boolean): boolean | string;
/**
 * 验证危险字符
 * @export
 * @param {(string|number)} data
 * @param {string} Msg
 * @return {*}  {(boolean | string)}
 */
export declare function VDangerousChar(data: string | number, Msg: string): boolean | string;
/**
 * 验证
 * data参数包含验证规则、属性、验证参数、
 * validate({
 *  VChinese_name: name,
 *  VChinese_address: address,
 * })
 * @param {({
 *         [keys: string]: string | any[];
 *     })} data keys验证规则，value验证对象和参数,当值为字符或者数字时仅作为验证对象，当值为数组时第一项是验证对象，其余为验证参数。
 * @param {boolean} isIncomplete
 * @return {*}  {*}
 */
declare function validate(data: {
    [keys: string]: string | any[];
}, isIncomplete?: boolean): any;
declare namespace validate {
    var VPhone: typeof import("./validate").VPhone;
    var VName: typeof import("./validate").VName;
    var VEmail: typeof import("./validate").VEmail;
    var VVerificationCode: typeof import("./validate").VVerificationCode;
    var VRequire: typeof import("./validate").VRequire;
    var VLimit: typeof import("./validate").VLimit;
    var VNumber: typeof import("./validate").VNumber;
    var VChinese: typeof import("./validate").VChinese;
    var VEnglish: typeof import("./validate").VEnglish;
    var VEqual: typeof import("./validate").VEqual;
    var VDangerousChar: typeof import("./validate").VDangerousChar;
    var VIdCard: typeof import("./validate").VIdCard;
}
export default validate;
