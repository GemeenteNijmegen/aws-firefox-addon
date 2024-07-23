const accountLinkPrefixOld = 'https://gemeentenijmegen.awsapps.com/start/#/saml/custom/'
const accountLinkPrefixNew = '#/console?'
const prefix = 'https://gemeentenijmegen.awsapps.com/start/'

const off = localStorage.getItem("gn-turn-off");

if (!off) {
  check();
}

// Run this every 100ms
function check(){
  alterLinksOnPage();
  console.log('Checking for new links on page');
  setTimeout(check, 500);
}

async function alterLinksOnPage(){
  const links = document.getElementsByTagName('a');
  for (const link of links) {
    const href = link.getAttribute('href');
    const isOldConsoleLink = href && href.startsWith(accountLinkPrefixOld);
    const isNewConsoleLink = href && href.startsWith(accountLinkPrefixNew);
    if (isOldConsoleLink || isNewConsoleLink) {
      console.log('Altering link', href);
      // Alter url
      const newHref = prefix + href;
      console.log('New href', newHref);
      link.setAttribute('href', '#');
      // link.setAttribute('new_href', newHref);
      link.removeAttribute('target');
      

      // Remove event listners
      const newLink = link.cloneNode(true);
      link.parentNode.replaceChild(newLink, link);

      // Adding event listner for handling click events on the new link
      newLink.addEventListener('click', async e => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        console.log('sending message...');
        await browser.runtime.sendMessage({
          target: newHref,
        });
      })
    }
  }
}