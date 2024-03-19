
## Configuration file (should be published somewhere)
Two configuration json options
```json
{
  "123456789012": {
    "name": "account-name",
    "color": "red",
  },
  "123456789012": "account-name"
}
```
If no color is porvided the color is selected based on the account name.
- Default: blue
- Acceptance/accp/acc: yellow
- Production/prod/prd: orange
- mpa: red

## Building
- Bump version number
- Run `yarn build`
- Upload zip to firefox addon people

## Installation
Install the xpi file provied after signing and validation by firefox addon people [(automated process)](https://addons.mozilla.org/nl/developers/)

## Update in firefox
- Go to firefox addons (menu addons and themes)
- Choose voorkeuren/preferences in the menu of the GemeenteNijmegen AWS addon voorkeuren/preferences
- Click the settings gear (tandwiel) icon
- Choose Install add-on from file / add-on installeren via bestand
- Choose the most recent signed and validated xpi

## Update config in firefox
- In this repo, open configration.json and choose raw
- Copy the url
- Go to firefox addons
- Choose voorkeuren/preferences in the menu of the GemeenteNijmegen AWS addon voorkeuren/preferences
- Paste the configuration.json url in the Config Url input and save
  
  ![firefox addon page](<./assets/Firefox addon aws nijmegen.png>)