const ACCOUNTIDS_INPUT_ID = '#accountIds';
const EXAMPLE_DATA = {"0123456789012": "account-name"};

/**
 * Save the values of the form in firefox storage
 * @param {*} event 
 */
function saveOptions(e) {
  e.preventDefault();

  const accountIds = document.querySelector(ACCOUNTIDS_INPUT_ID).value;

  try {
    if(accountIds){
      JSON.parse(accountIds);
    }
  } catch( error ){
    alert('Could not set account IDs, invalid JSON?', error);
    return;
  }

  browser.storage.sync.set({
    accountIds: accountIds
  });
  alert('saved!');
}

/**
 * Load the saved config into the html form
 */
function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector(ACCOUNTIDS_INPUT_ID).value = result.accountIds || JSON.stringify(EXAMPLE_DATA, null, 4);
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
