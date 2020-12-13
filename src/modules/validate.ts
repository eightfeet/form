/**
 * 验证手机，data: 手机号码，strict: 当第三个参数设为'strict'时开启严格验证，不填时只验证已1开头的11位手机号码
 * @param {(string | number)} data 电话号码
 * @param {string} Msg 失败信息
 * @param {'strict'} strict 严格验证模式，非严格只验证1开头11位数字
 * @return {*}  {(string | false)} 返回错误信息(验证失败)或false(验证通过)
 */
export function VPhone(
    data: string | number,
    Msg: string,
    strict: 'strict'
): string | false {
    let Str: any;

    if (data !== 0) {
        Str = data;
    } else {
        Str = '0';
    }

    Str ? (Str = Str.toString()) : null;

    const fixStrict = strict || null;

    if (!Str || Str.length !== 11) {
        return Msg || '请输入11位手机号码';
    }

    if (!/^[0-9]*$/.test(Str)) {
        return Msg || '手机号码格式不正确';
    }

    if (fixStrict !== 'strict' && !/^1\d{10}$/.test(Str)) {
        return Msg || '请输入以1开头的11位手机号码';
    }

    if (fixStrict === 'strict' && !/^1[3|4|5|7|8]\d{9}$/.test(Str)) {
        return Msg || '请输入正确手机号码';
    }

    return false;
}

/**
 * validate the name
 * @export
 * @param {(string | number)} name
 * @param {string} Msg
 * @param {'Zh'} Zh
 * @return {*}  {(string | false)} 返回错误信息(验证失败)或false(验证通过)
 */
export function VName(
    name: string | number,
    Msg: string,
    Zh: 'Zh'
): string | false {
    let Str: any;

    if (name !== 0) {
        Str = name;
    } else {
        Str = '0';
    }
    Str ? (Str = Str.toString()) : null;
    const fixZh = Zh || null;

    if (!Str || Str.length < 1) {
        return Msg || '请输入您的姓名';
    }

    if (fixZh !== 'Zh' && !/^[\u4E00-\u9FA5A-Za-z0-9]+$/.test(Str)) {
        return Msg || '姓名请使用非特殊字符';
    }

    if (fixZh === 'Zh' && Str.length < 2) {
        return Msg || '请输您的真实姓名';
    }

    if (fixZh === 'Zh' && !/^[\u4e00-\u9fa5]+$/.test(Str)) {
        return Msg || '请输您的真实姓名';
    }

    return false;
}

/**
 *
 * 验证email
 * @export
 * @param {string} email
 * @param {string} Msg 错误信息
 * @return {*}  {(string | false)} 返回错误信息(验证失败)或false(验证通过)
 */
export function VEmail(email: string, Msg: string): string | false {
    let Str: any;

    Str = email;

    Str ? (Str = Str.toString()) : null;

    if (!Str || Str.length < 1) {
        return Msg || '请输入您的邮箱';
    }

    if (!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(Str)) {
        return Msg || '请输正确的邮箱地址';
    }

    return false;
}

/**
 *
 * 身份证验证
 * @export
 * @param {(string| number)} data
 * @param {string} Msg
 * @return {*}  {(string | false)}
 */
export function VIdCard(data: string | number, Msg: string): string | false {
    let idcard: any;

    if (data !== 0) {
        idcard = data;
    } else {
        idcard = '0';
    }

    idcard ? (idcard = idcard.toString()) : null;

    const Errors = new Array(
        '验证通过!',
        '身份证号码位数不对!',
        '身份证号码出生日期超出范围或含有非法字符!',
        '身份证号码校验错误!',
        '身份证地区非法!'
    );
    const area = {
        11: '北京',
        12: '天津',
        13: '河北',
        14: '山西',
        15: '内蒙古',
        21: '辽宁',
        22: '吉林',
        23: '黑龙江',
        31: '上海',
        32: '江苏',
        33: '浙江',
        34: '安徽',
        35: '福建',
        36: '江西',
        37: '山东',
        41: '河南',
        42: '湖北',
        43: '湖南',
        44: '广东',
        45: '广西',
        46: '海南',
        50: '重庆',
        51: '四川',
        52: '贵州',
        53: '云南',
        54: '西藏',
        61: '陕西',
        62: '甘肃',
        63: '青海',
        64: '宁夏',
        65: '新疆',
        71: '台湾',
        81: '香港',
        82: '澳门',
        91: '国外',
    };
    let ereg, Y, JYM;
    let S, M;
    let idcard_array = new Array();
    idcard_array = idcard.split('');
    //地区检验
    if (area[parseInt(idcard.substr(0, 2), 0)] === null) {
        return Msg || Errors[4];
    }

    //身份号码位数及格式检验
    switch (idcard.length) {
        case 15:
            if (
                (parseInt(idcard.substr(6, 2), 0) + 1900) % 4 === 0 ||
                ((parseInt(idcard.substr(6, 2), 0) + 1900) % 100 === 0 &&
                    (parseInt(idcard.substr(6, 2), 0) + 1900) % 4 === 0)
            ) {
                ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; //测试出生日期的合法性
            } else {
                ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; //测试出生日期的合法性
            }
            if (ereg.test(idcard)) {
                return false;
            }

            return Msg || Errors[2];

        case 18:
            //18位身份号码检测
            //出生日期的合法性检查
            //闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
            //平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
            if (
                parseInt(idcard.substr(6, 4), 0) % 4 === 0 ||
                (parseInt(idcard.substr(6, 4), 0) % 100 === 0 &&
                    parseInt(idcard.substr(6, 4), 0) % 4 === 0)
            ) {
                ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; //闰年出生日期的合法性正则表达式
            } else {
                ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; //平年出生日期的合法性正则表达式
            }

            if (ereg.test(idcard)) {
                //测试出生日期的合法性
                //计算校验位
                S =
                    (parseInt(idcard_array[0], 0) +
                        parseInt(idcard_array[10], 0)) *
                        7 +
                    (parseInt(idcard_array[1], 0) +
                        parseInt(idcard_array[11], 0)) *
                        9 +
                    (parseInt(idcard_array[2], 0) +
                        parseInt(idcard_array[12], 0)) *
                        10 +
                    (parseInt(idcard_array[3], 0) +
                        parseInt(idcard_array[13], 0)) *
                        5 +
                    (parseInt(idcard_array[4], 0) +
                        parseInt(idcard_array[14], 0)) *
                        8 +
                    (parseInt(idcard_array[5], 0) +
                        parseInt(idcard_array[15], 0)) *
                        4 +
                    (parseInt(idcard_array[6], 0) +
                        parseInt(idcard_array[16], 0)) *
                        2 +
                    parseInt(idcard_array[7], 0) * 1 +
                    parseInt(idcard_array[8], 0) * 6 +
                    parseInt(idcard_array[9], 0) * 3;
                Y = S % 11;
                M = 'F';
                JYM = '10X98765432';
                M = JYM.substr(Y, 1); //判断校验位
                if (M === idcard_array[17]) {
                    return false;
                }
                //检测ID的校验位
                return Msg || Errors[3];
            }
            return Msg || Errors[2];
        default:
            return Msg || Errors[1];
    }
}

/**
 * 验证码验证
 * @export
 * @param {(string | number)} data 验证码
 * @param {string} Msg
 * @param {number} length 验证码长度
 * @return {*}  {(false | string)}
 */
export function VVerificationCode(
    data: string | number,
    Msg: string,
    length: number
): false | string {
    let Str;

    if (data !== 0) {
        Str = data;
    } else {
        Str = '0';
    }

    Str ? (Str = Str.toString()) : null;
    const fixLength = length || 4;

    if (length && isNaN(fixLength)) {
        return Msg || '验证码验证时参数错误';
    }

    if (!Str || Str.length !== fixLength) {
        return Msg || `请输入${fixLength}位验证码`;
    }

    if (!/^[0-9]*$/.test(Str)) {
        return Msg || '您输入的验证码格式不正确，请重新输入';
    }

    return false;
}

/**
 * 验证字符必填（长度）
 * @export
 * @param {(string|number)} data
 * @param {string} Msg
 * @param {number} length
 * @return {*}  {(boolean|string)}
 */
export function VRequire(
    data: string | number,
    Msg: string,
    length: number
): boolean | string {
    let Str: any;

    if (data !== 0) {
        Str = data;
    } else {
        Str = '0';
    }

    Str ? (Str = Str.toString()) : null;
    const fixLength = length || 1;

    if (isNaN(fixLength) || !Str) {
        return Msg || '必填项验证时参数错误';
    }

    if (Str.length < fixLength) {
        return Msg || true;
    }

    return false;
}

/**
 * 验证最少字符串
 * @export
 * @param {(string|number)} data
 * @param {string} Msg
 * @param {number} length
 * @return {*}  {(boolean | string)}
 */
export function VLimit(
    data: string | number,
    Msg: string,
    length: number
): boolean | string {
    let Str;

    if (data !== 0) {
        Str = data;
    } else {
        Str = '0';
    }

    Str ? (Str = Str.toString()) : null;
    const fixLength = length || 20;

    if (isNaN(fixLength) || !Str) {
        return Msg || '限制字符串长度验证时参数错误';
    }

    if (Str.length > fixLength) {
        return true;
    }

    return false;
}

/**
 * 验证数字
 * @export
 * @param {(string|number)} data
 * @param {string} Msg
 * @return {*}  {(boolean | string)}
 */
export function VNumber(data: string | number, Msg: string): boolean | string {
    let Str;

    if (data !== 0) {
        Str = data;
    } else {
        Str = '0';
    }

    Str ? (Str = Str.toString()) : null;

    if (!/^[0-9]*$/.test(Str)) {
        return Msg || true;
    }

    return false;
}

/**
 * 验证中文
 * @export
 * @param {(string | number)} data
 * @param {string} Msg
 * @return {*}  {(boolean|string)}
 */
export function VChinese(data: string | number, Msg: string): boolean | string {
    let Str;

    if (data !== 0) {
        Str = data;
    } else {
        Str = '0';
    }

    Str ? (Str = Str.toString()) : null;

    if (!/^[\u4e00-\u9fa5]+$/.test(Str)) {
        return Msg || true;
    }

    return false;
}

/**
 * 验证英文
 * @export
 * @param {(string|number)} data
 * @param {string} Msg
 * @return {*}  {(boolean | string)}
 */
export function VEnglish(data: string | number, Msg: string): boolean | string {
    let Str;

    if (data !== 0) {
        Str = data;
    } else {
        Str = '0';
    }

    Str ? (Str = Str.toString()) : null;

    if (!/^[a-zA-Z]*$/.test(Str)) {
        return Msg || true;
    }

    return false;
}

/**
 * 数据比较
 * @export
 * @param {string} dataA 比较数据A
 * @param {string} dataB 比较数据B
 * @param {string} Msg
 * @param {boolean} turnOver false 时比较两个数据不相等
 * @return {*}  {(boolean | string)}
 */
export function VEqual(
    dataA: string,
    dataB: string,
    Msg: string,
    turnOver: boolean
): boolean | string {
    if (!dataA || !dataB) {
        console.error('请传入比较参数');
        return;
    }

    if (turnOver === false) {
        if (dataA !== dataB) {
            return Msg || '数据不相等！';
        }
    } else {
        if (dataA === dataB) {
            return Msg || '数据相等！';
        }
    }

    return false;
}

/**
 * 验证危险字符
 * @export
 * @param {(string|number)} data
 * @param {string} Msg
 * @return {*}  {(boolean | string)}
 */
export function VDangerousChar(
    data: string | number,
    Msg: string
): boolean | string {
    let Str;

    if (data !== 0) {
        Str = data;
    } else {
        Str = '0';
    }

    Str ? (Str = Str.toString()) : null;

    if (
        /select |update |delete |truncate |join |union |exec |insert |drop |count|’|"|;|>|<|%/i.test(
            Str
        )
    ) {
        return Msg || true;
    }

    return false;
}


// validate.VPhone = VPhone;
// validate.VName = VName;
// validate.VEmail = VEmail;
// validate.VVerificationCode = VVerificationCode;
// validate.VRequire = VRequire;
// validate.VLimit = VLimit;
// validate.VNumber = VNumber;
// validate.VChinese = VChinese;
// validate.VEnglish = VEnglish;
// validate.VEqual = VEqual;
// validate.VDangerousChar = VDangerousChar;
// validate.VIdCard = VIdCard;

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
function validate(
    data: {
        [keys: string]: string | any[];
    },
    isIncomplete?: boolean
): any {
    if (Object.prototype.toString.call(data) !== '[object Object]') {
        console.error('validate方法，请传入验证对象类型参数{key: value}');
        return '验证失败，传入参数不正确！';
    }

    if (isIncomplete && typeof isIncomplete === 'boolean') {
        const VError = {};
        for (let key in data) {
            if ({}.hasOwnProperty.call(data, key)) {
                if (key.indexOf('_') !== -1) {
                    const splitkey = key.split('_')[0];
                    if (validate[splitkey]) {
                        if (Array.isArray(data[key])) {
                            const _Ad = validate[splitkey].apply(
                                validate[splitkey],
                                data[key]
                            );
                            if (_Ad) {
                                VError[key] = _Ad;
                            } else {
                                // VError[key] = false;
                            }
                        } else {
                            const _Nd = validate[splitkey](data[key]);
                            if (_Nd) {
                                VError[key] = _Nd;
                            } else {
                                // VError[key] = false;
                            }
                        }
                    }
                }

                if (key.indexOf('_') === -1) {
                    if (validate[key]) {
                        if (Array.isArray(data[key])) {
                            const Ad = validate[key].apply(
                                validate[key],
                                data[key]
                            );
                            if (Ad) {
                                VError[key] = Ad;
                            } else {
                                // VError[key] = false;
                            }
                        } else {
                            const Nd = validate[key](data[key]);
                            if (Nd) {
                                VError[key] = Nd;
                            } else {
                                // VError[key] = false;
                            }
                        }
                    }
                }
            }
        }

        if (Object.keys(VError).length === 0) {
            return false;
        }

        return VError;
    }

    for (let key in data) {
        if ({}.hasOwnProperty.call(data, key)) {
            if (key.indexOf('_') !== -1) {
                const splitkey = key.split('_')[0];
                if (validate[splitkey]) {
                    if (Array.isArray(data[key])) {
                        const _Ad = validate[splitkey].apply(
                            validate[splitkey],
                            data[key]
                        );
                        if (_Ad) {
                            return _Ad;
                        }
                    } else {
                        const _Nd = validate[splitkey](data[key]);
                        if (_Nd) {
                            return _Nd;
                        }
                    }
                }
            }

            if (key.indexOf('_') === -1) {
                if (validate[key]) {
                    if (Array.isArray(data[key])) {
                        const Ad = validate[key].apply(
                            validate[key],
                            data[key]
                        );
                        if (Ad) {
                            return Ad;
                        }
                    } else {
                        const Nd = validate[key](data[key]);
                        if (Nd) {
                            return Nd;
                        }
                    }
                }
            }
        }
    }

    return false;
}

validate.VPhone = VPhone;
validate.VName = VName;
validate.VEmail = VEmail;
validate.VVerificationCode = VVerificationCode;
validate.VRequire = VRequire;
validate.VLimit = VLimit;
validate.VNumber = VNumber;
validate.VChinese = VChinese;
validate.VEnglish = VEnglish;
validate.VEqual = VEqual;
validate.VDangerousChar = VDangerousChar;
validate.VIdCard = VIdCard;

export default validate;