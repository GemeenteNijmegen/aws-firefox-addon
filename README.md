
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
Install the xpi file provied after signing and validation by firefox addon people (automated process)