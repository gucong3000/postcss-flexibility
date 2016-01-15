import postcss from 'postcss';
import test from 'ava';

import plugin from './';

function run(t, input, output) {
	return postcss([plugin()]).process(input)
		.then(result => {
			t.same(result.css, output);
			t.same(result.warnings().length, 0);
		});
}

test('-js-display and display', t => {
	return run(
		t,
		'a {display: -webkit-flex;display: -ms-flexbox;display: flex}',
		'a {display: -webkit-flex;display: -ms-flexbox;-js-display: flex;display: flex}'
	);
});
