class DOM {

  /**
   * Show the actual hint
   */
  showAccountIdHint(document, text, colorName) {
    const color = this._resolveColor(colorName)
    this._insertStylingOnPage(document, color);

    const tip = document.createElement('span');
    tip.setAttribute('id', 'gemeente-nijmegen-account-tip');
    document.body.insertBefore(tip, document.body.firstChild);
    tip.appendChild(document.createTextNode(text));
  }

  /**
   * Add some styling for the hint
   */
  _insertStylingOnPage(document, color) {

    const css = `
      #gemeente-nijmegen-account-tip {
        font-family: Verdana, sans-serif;
        padding: 10px;
        color: white;
        position: fixed;
        left: 0px;
        right: 0px;
        bottom: 0px;
        margin-left: auto;
        margin-right: auto;
        width: fit-content;
        z-index: 2000;
        background: ${color};
        border-radius: 10px 10px 0px 0px;
      }
    `

    var style = document.createElement('style');
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  _resolveColor(name) {
    switch (name) {
      case 'red':
        return '#e8554e';
      case 'orange':
        return '#f19c65';
      case 'yellow':
        return '#ffd265';
      case 'green':
        return '#2aa876';
      case 'blue':
        return '#0a7b83';
      case 'none':
        return 'none';
      default:
        return name;
    }
  }

  defaultAccountColor(name) {
    if(!name){ return 'none' }
    if(name.includes('acceptance') || name.includes('accp') || name.includes('acc')){
      return this._resolveColor('orange');
    }
    if(name.includes('production') || name.includes('prod') || name.includes('prd')){
      return this._resolveColor('red');
    }
    if(name.includes('sandbox')){
      return this._resolveColor('green');
    }
    return 'none';
  }

}


if (typeof exports !== 'undefined') {
  module.exports = { DOM };
}