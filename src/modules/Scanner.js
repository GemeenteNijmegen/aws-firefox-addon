class Scanner {

  /**
   * Search the page for the current account ID (12 numbers)
   * @returns Account ID 12 numbers
   */
  findAccountIdOnPage(accountInformationHtml) {
    const accountIdRegex = new RegExp('[0-9]{4}-[0-9]{4}-[0-9]{4}')
    const accountIds = accountInformationHtml.match(accountIdRegex);
    if (!accountIds || accountIds.length != 1) {
      console.error('Non or multiple possible account ids found in DOM', accountIds);
      return undefined;
    }

    const accountId = accountIds[0].replace(new RegExp('-', 'g'), '');
    if (!accountId || accountId.length != 12) {
      console.error('The obtained account id is not 12 numbers in length');
      return undefined;
    }

    return accountId;
  }

  /**
   * Search the page for the currently assumed role
   * @returns the assumed role
   */
  findFederatedRoleOnPage(accountInformationHtml) {

    const federatedRoleRegex = new RegExp('AWSReservedSSO_.*/.*@.*')

    const federatedRoles = accountInformationHtml.match(federatedRoleRegex);
    if (!federatedRoles || federatedRoles.length != 1) {
      console.error('Non or multiple possible federated roles found in DOM', federatedRoles);
      return undefined;
    }

    let federatedRole = federatedRoles[0];
    federatedRole = federatedRole.replace('AWSReservedSSO_', '')
    federatedRole = federatedRole.split('/')[0];
    federatedRole = federatedRole.split('_');
    federatedRole = federatedRole.splice(federatedRole.length - 2, 1);
    federatedRole = federatedRole.join('_');

    return federatedRole;
  }



}


if (typeof exports !== 'undefined') {
  module.exports = { Scanner };
}