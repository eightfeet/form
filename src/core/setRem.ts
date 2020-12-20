const isPC = !navigator.userAgent.match(
	/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
);

// isFinite Polyfill
Number.isFinite =
  Number.isFinite ||
  function (value) {
  	return typeof value === "number" && isFinite(value);
  };

/**
 * 设置dom的font-size，用于控制子元素的em基准单位，pc端时 font-size = 16px，
 * 如果有emBase传入直接使用emBase为基准字体大小
 * 其他按规则计算字体值（屏幕宽度:UI宽度 = 屏幕字体大小:UI字体大小）
 * @param {HTMLElement} dom
 * @param {String} parentId
 * @param {Number} emBase
 * @returns
 */
function setEmBase(dom: HTMLElement, parentId: string, emBase: number) {
	const emBaseValidate = Number.isFinite(emBase);
	if (emBaseValidate) {
		dom.style.fontSize = `${emBase}px`;
		return;
	}
	let docEl = window.document.documentElement;
	let parEl = window.document.getElementById(parentId);
	let clientWidth = docEl.clientWidth;
	let parentWidth = parEl ? parEl.clientWidth : null;
	const baseFont = 31.2;
	const uiWidth = 750;
	if (parEl) {
		if (parentWidth >= uiWidth) {
			dom.style.fontSize = baseFont + "px";
		} else {
			dom.style.fontSize = baseFont * (parentWidth / uiWidth) + "px";
		}
		return;
	}
	if (!clientWidth) return;
	if (isPC) {
		dom.style.fontSize = "16px";
		return;
	}

	if (clientWidth >= uiWidth) {
		dom.style.fontSize = baseFont + "px";
	} else {
		dom.style.fontSize = baseFont * (clientWidth / uiWidth) + "px";
	}
}

export default setEmBase;