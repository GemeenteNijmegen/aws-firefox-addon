
/**
 * ChatGPT generated class for opening URLs in Firefox containers
 */
class ContainerURLLoader {

  // Define an enum for the supported container colors
  static Colors = Object.freeze({
    BLUE: "blue",
    TURQUOISE: "turquoise",
    GREEN: "green",
    YELLOW: "yellow",
    ORANGE: "orange",
    RED: "red",
    PINK: "pink",
    PURPLE: "purple",
    TOOLBAR: "toolbar"
  });

  static Icons = Object.freeze({
    FINGERPRINT: 'fingerprint',
    BRIEFCASE: 'briefcase',
    DOLLAR: 'dollar',
    CART: 'cart',
    CIRCLE: 'circle',
    GIFT: 'gift',
    VACATION: 'vacation',
    FOOD: 'food',
    FRUIT: 'fruit',
    PET: 'pet',
    TREE: 'tree',
    CHILL: 'chill',
    FENCE: 'fence'
  });
  

  constructor(containerName, color, icon) {
    if(color && !Object.values(ContainerURLLoader.Colors).includes(color)){
      throw Error("Provide a ContainerURLLoader.Colors");
    }
    if(icon && !Object.values(ContainerURLLoader.Icons).includes(icon)){
      throw Error("Provide a ContainerURLLoader.Icons");
    }
    this.containerName = containerName;
    this.containerColor = color ?? this.getDefaultColor(containerName);
    this.containerIcon = icon || ContainerURLLoader.Icons.CIRCLE;
  }

  getDefaultColor(containerName){
    console.log('looking up default color for', containerName)
    if(!containerName){
      return ContainerURLLoader.Colors.BLUE;
    }
    if(containerName.includes('acceptance') || containerName.includes('accp') || containerName.includes('acc')){
      return ContainerURLLoader.Colors.YELLOW;
    }
    if(containerName.includes('production') || containerName.includes('prod') || containerName.includes('prd')){
      return ContainerURLLoader.Colors.ORANGE;
    }
    if(containerName.includes('mpa')){
      return ContainerURLLoader.Colors.RED;
    }
    if(containerName.includes('sandbox')){
      return ContainerURLLoader.Colors.GREEN;
    }
    return ContainerURLLoader.Colors.BLUE;
  }

  async loadURL(url) {
    const currentIndex = await this.getCurrentTabIndex();
    const identities = await browser.contextualIdentities.query({ name: this.containerName });
    const identity = identities[0];
    if(identity){
      const openURL = confirm(`Would you like to open the url ${url} in container ${this.containerName} ?`);
      if(openURL){
        await this.openUrlInContainer(url, identity.cookieStoreId, currentIndex);
        await this.closeCurrentTab();
      }
      return;
    }

    const prompt = confirm(`The container ${this.containerName} does not exist. Would you like to create the container and open ${url} ?`);
    const container = await this.createContainer();
    if(prompt) { 
      await this.openUrlInContainer(url, container.cookieStoreId, currentIndex);
      await this.closeCurrentTab();
    }
  }

  async createContainer(){
    return browser.contextualIdentities.create({
      name: this.containerName,
      color: this.containerColor,
      icon: this.containerIcon
    });
  }

  async openUrlInContainer(url, cookieStoreId, index){
    browser.tabs.create({
      url: url,
      cookieStoreId: cookieStoreId,
      index: index,
    });
  }

  async closeCurrentTab() {
    let currentTab = await browser.tabs.getCurrent()
    await browser.tabs.remove(currentTab.id)
  }
  
  async getCurrentTabIndex(){
    let currentTab = await browser.tabs.getCurrent();
    return currentTab.index;
  }
}

const customProtocolPrefix = 'ext+gn';


function parseOpenerParams(rawHash) {
  if (rawHash[0] != '#') {
      throw new Error('not a valid location hash')
  }

  const uri = decodeURIComponent(rawHash.substring(1))

  if (!uri.startsWith(customProtocolPrefix)) {
      throw new Error('unknown URI protocol')
  }

  return 'https' + uri.substring(customProtocolPrefix.length);
  
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

function getAccountIdFromUrl(url){
  const prefix = 'https://gemeentenijmegen.awsapps.com/start/';
  if(!url.startsWith(prefix)){
    throw Error(`Url ${url} is not an Gemeente Nijmegen AWS account URL`);
  }
  return url.substring(prefix.length, prefix.length + 12); 
}

async function run(){
  const url = parseOpenerParams(window.location.hash);
  const accountId = getAccountIdFromUrl(url);
  const configuration = await getAccountIdsFromConfiguration();
  const accountDetails = lookupAccountId(accountId, configuration);
  let name = accountDetails;
  if(typeof accountDetails == 'object'){
    name = accountDetails.name;
  }
  const container = new ContainerURLLoader(name);
  await container.loadURL(url);
}


run().then(() => console.log('Success!')).catch(err => console.error("Could not open in container", err))
