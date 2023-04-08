const { DOM } = require('../src/modules/DOM');
const { JSDOM } = require('jsdom');

test('resolve color', () => {
  const dom = new DOM();
  expect(dom._resolveColor('red')).toBe('#e8554e');
  expect(dom._resolveColor('none')).toBe('none');
  expect(dom._resolveColor('random')).toBe('random');
});

test('default color', () => {
  const dom = new DOM();
  expect(dom.defaultAccountColor(undefined)).toBe('none');
  expect(dom.defaultAccountColor('random')).toBe('none');

  expect(dom.defaultAccountColor('test-acceptance')).toBe(dom._resolveColor('orange'));
  expect(dom.defaultAccountColor('test-accp')).toBe(dom._resolveColor('orange'));
  expect(dom.defaultAccountColor('test-acc')).toBe(dom._resolveColor('orange'));
  
  expect(dom.defaultAccountColor('test-production')).toBe(dom._resolveColor('red'));
  expect(dom.defaultAccountColor('test-prod')).toBe(dom._resolveColor('red'));
  expect(dom.defaultAccountColor('test-prd')).toBe(dom._resolveColor('red'));
  
  expect(dom.defaultAccountColor('test-sandbox')).toBe(dom._resolveColor('green'));

});

test('insert styling no background', () => {
  const dom = new DOM();

  const domMock = new JSDOM()
  global.document = domMock.window.document
  global.window = domMock.window

  const color = 'none';
  dom._insertStylingOnPage(global.document, color);
  const colorStyle = global.document.getElementsByTagName('style')[0].innerHTML;
  expect(colorStyle).toContain('#gemeente-nijmegen-account-tip');
  expect(colorStyle).toContain('background: none;');

});

test('insert styling with background', () => {
  const dom = new DOM();

  const domMock = new JSDOM()
  global.document = domMock.window.document
  global.window = domMock.window

  const color = dom._resolveColor('red');

  dom._insertStylingOnPage(global.document, color);
  const colorStyle = global.document.getElementsByTagName('style')[0].innerHTML;
  expect(colorStyle).toContain('#gemeente-nijmegen-account-tip');
  expect(colorStyle).toContain(`background: ${color};`);

});

test('insert styling with background', () => {
  const dom = new DOM();

  const domMock = new JSDOM()
  global.document = domMock.window.document
  global.window = domMock.window

  const color = dom._resolveColor('red');

  dom._insertStylingOnPage(global.document, color);
  const colorStyle = global.document.getElementsByTagName('style')[0].innerHTML;
  expect(colorStyle).toContain('#gemeente-nijmegen-account-tip');
  expect(colorStyle).toContain(`background: ${color};`);

});

test('insert hint in dom', () => {
  const dom = new DOM();
  const domMock = new JSDOM()
  global.document = domMock.window.document
  global.window = domMock.window

  dom.showAccountIdHint(global.document, 'test', 'red');

  const element = global.document.getElementById('gemeente-nijmegen-account-tip').innerHTML;
  expect(element).toBe('test');

});