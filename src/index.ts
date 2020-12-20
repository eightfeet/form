// pollyfill
if (window.Promise === undefined) {
	throw new Error('Promise pollyfill not found.');
}

if (window.fetch === undefined) {
	throw new Error('fetch pollyfill not found.');
}
import '~/style/common.scss';
import Form, { FormOptions } from './modules/';
import { FieldType, Field } from './types/data';

export {FormOptions, FieldType, Field };
export default Form;
