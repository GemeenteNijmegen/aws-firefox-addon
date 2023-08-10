const CONFIG_URL_FIELD = '#configUrl';

/**
 * Save the values of the form in firefox storage
 * @param {*} event 
 */
function saveOptions(e) {
  e.preventDefault();

  const configUrl = document.querySelector(CONFIG_URL_FIELD).value;
  setConfigFromUrl(configUrl).then(() => {
    alert('saved!');
  }).catch((error) => {
    alert('Could not set account IDs, invalid JSON?', error);
  });

}

async function setConfigFromUrl(url) {
  const response = await fetch(url);
  const accountIds = await response.json();
  const json = JSON.stringify(accountIds, null, 4);
  alert(json);
  browser.storage.sync.set({
    accountIds: json
  });
}

/**
 * Load the saved config into the html form
 */
function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector(ACCOUNTIDS_INPUT_ID).value = result.accountIds;
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.sync.get();
  getting.then(setCurrentChoice, onError);
}

// Setup loading and save actions for options.html form
document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
