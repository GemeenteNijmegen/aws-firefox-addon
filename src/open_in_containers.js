const accountLinkPrefix = 'https://gemeentenijmegen.awsapps.com/start/#/saml/custom/'

document.addEventListener("click", function(e){
  const link = e.target.closest("a");

  if(link){
    e.preventDefault();
    const href = link.getAttribute('href');
    console.log(href);
    if(href && href.startsWith(accountLinkPrefix)){
      const newHref = 'ext+gn' + href.substring(5);
      console.log('Altering link:', href, newHref);
      window.open(newHref, '_blank');
    }
  }
});