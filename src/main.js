runSync(true);

try {
  const accountInformationHtml = document.querySelector('body');
  console.log(accountInformationHtml)
} catch (error) {
  console.error("Could not find body:", error);
}

function runSync(retry){
  run()
  .then(() => console.info("GemeenteNijmegen: account hint shown!"))
  .catch(error => {
    console.error("GemeenteNijmegen: account could not be shown!", error);
    if(retry){
      console.info("Scheduling retries in 2, 5 and 10 seconds...");
      setTimeout(() => runSync(false), 2000);
      setTimeout(() => runSync(false), 5000);
      setTimeout(() => runSync(false), 10000);
    }
  });
}

/**
 * Main run method loads config and shows the hint
 */
async function run() {
  const accountIds = await getAccountIdsFromConfiguration();
  const accountInformationHtml = document.querySelector('div[data-testid="account-detail-menu"]').innerHTML;

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
  if(role && role.endsWith('-ep')){
    hint = `⚠️ ${hint} ⚠️`;
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
