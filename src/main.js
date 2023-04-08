
run()
  .then(() => console.info("GemeenteNijmegen: account hint shown!"))
  .catch(error => console.error("GemeenteNijmegen: account could not be shown!", error))

const container = new ContainerURLLoader('test', 'red');
container.loadURL('https://google.com');


/**
 * Main run method loads config and shows the hint
 */
async function run() {
  const accountIds = await getAccountIdsFromConfiguration();
  const accountInformationHtml = document.querySelector('[data-testid="account-detail-menu"]').innerHTML;

  const dom = new DOM();
  const scanner = new Scanner();
  const role = scanner.findFederatedRoleOnPage(accountInformationHtml);
  const accountId = scanner.findAccountIdOnPage(accountInformationHtml);
  const accountInfo = lookupAccountId(accountId, accountIds);

  let accountName = undefined;
  let accountColor = 'blue';
  if (typeof accountInfo == 'string') {
    accountName = accountInfo;
    accountColor = dom.defaultAccountColor(accountName);
  } else {
    accountName = accountInfo.name;
    accountColor = accountInfo.color;
  }

  // Show the hint
  let hint = `${role} @ ${accountName}`;
  if(!role){
    hint = accountName;
  }
  dom.showAccountIdHint(document, hint, accountColor);

}


/**
 * Lookup in storage the configured account IDs
 * @returns account configuration json
 */
async function getAccountIdsFromConfiguration() {
  const data = await browser.storage.sync.get();
  return JSON.parse(data.accountIds);
}

/**
 * Simple lookup of the account id in the provided configuration
 * @returns 
 */
function lookupAccountId(accountId, accountIds) {
  const accountName = accountIds[accountId];
  if (!accountName) {
    return accountId;
  }
  return accountName;
}
