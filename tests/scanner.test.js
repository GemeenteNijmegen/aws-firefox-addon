const { Scanner } = require('../src/modules/Scanner');
const { JSDOM } = require('jsdom');
const { beforeEach } = require('node:test');


const html = `<div class="globalNav-1235" data-testid="account-detail-menu"><div class="globalNav-1236"><div><span>Account ID: </span><span>1234-5678-9012</span><button class="globalNav-1238 awsui_button_vjswe_zs0n5_101 awsui_variant-inline-icon_vjswe_zs0n5_184 awsui_button-no-text_vjswe_zs0n5_885" data-testid="awsc-copy-accountid" aria-label="Copy Account Id" type="submit"><span class="awsui_icon_vjswe_zs0n5_905 awsui_icon-left_vjswe_zs0n5_905 awsui_icon_h11ix_1pphm_98 awsui_size-normal-mapped-height_h11ix_1pphm_151 awsui_size-normal_h11ix_1pphm_147 awsui_variant-normal_h11ix_1pphm_219"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" focusable="false" aria-hidden="true"><path class="stroke-linejoin-round" d="M2 5h9v9H2z"></path><path class="stroke-linejoin-round" d="M5 5V2h9v9h-3"></path></svg></span></button></div><div title="AWSReservedSSO_test-role_cd19bebd8b3032e0/mail@example.nl"><span>Federated user: </span><span class="globalNav-1239">AWSReservedSSO_test-role_cd19bebd8b3032e0/mail@example.nl</span><button class="globalNav-1238 awsui_button_vjswe_zs0n5_101 awsui_variant-inline-icon_vjswe_zs0n5_184 awsui_button-no-text_vjswe_zs0n5_885" data-testid="awsc-copy-username" aria-label="Copy Username" type="submit"><span class="awsui_icon_vjswe_zs0n5_905 awsui_icon-left_vjswe_zs0n5_905 awsui_icon_h11ix_1pphm_98 awsui_size-normal-mapped-height_h11ix_1pphm_151 awsui_size-normal_h11ix_1pphm_147 awsui_variant-normal_h11ix_1pphm_219"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" focusable="false" aria-hidden="true"><path class="stroke-linejoin-round" d="M2 5h9v9H2z"></path><path class="stroke-linejoin-round" d="M5 5V2h9v9h-3"></path></svg></span></button></div></div></div>`;

beforeAll(() => {
  console.error = jest.fn();
  console.log = jest.fn();
})

beforeEach(() => {
  const domMock = new JSDOM(html)
  global.document = domMock.window.document
  global.window = domMock.window
});

test('Find account ID on page', () => {
  const s = new Scanner();
  const id = s.findAccountIdOnPage(html);
  expect(id).toBe('123456789012')
});

test('No account ID on page', () => {
  const s = new Scanner();
  const id = s.findAccountIdOnPage('');
  expect(id).toBe(undefined)
});

test('Find assumed role on page', () => {
  const s = new Scanner();
  const id = s.findFederatedRoleOnPage(html);
  expect(id).toBe('test-role')
});

test('No assumed role on page', () => {
  const s = new Scanner();
  const id = s.findFederatedRoleOnPage('');
  expect(id).toBe(undefined)
});
