const accountLinkPrefixOld = 'https://gemeentenijmegen.awsapps.com/start/#/saml/custom/'
const accountLinkPrefixNew = 'https://gemeentenijmegen.awsapps.com/start/#/console?'

const off = localStorage.getItem("gn-turn-off");


if(!off){
  document.addEventListener("click", function(e){
    const link = e.target.closest("a");
  
    if(link){
      //e.preventDefault();
      const href = link.getAttribute('href');
      console.log(href);
      const isOldConsoleLink = href && href.startsWith(accountLinkPrefixOld);
      const isNewConsoleLink = href && href.startsWith(accountLinkPrefixNew);
      if(isOldConsoleLink || isNewConsoleLink){
        const newHref = 'ext+gn' + href.substring(5);
        console.log('Altering link:', href, newHref);
        link.setAttribute('href', newHref);
      }
    }
  });
}
