# CLIENT

### Setup Prettier (code formatter)
- [Install ESLint Extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Install Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- Create `.eslintrc` on project root and add:
  ```json
  {
    "extends": "react-app",
    "plugins": ["prettier"],
    "rules": {
      "prettier/prettier": "error"
    }
  }
  ```
- Create `.prettierrc` on project root and add:
  ```json
  {
    "singleQuote": true,
    "trailingComma": "es5"
  }
  ```
- Change your workspace (`.vscode/settings.json`) settings to:
  ```json
  "editor.formatOnSave": true,
  "editor.tabSize": 2
  ```

### Environment file
 - Create `.env` file on project root and add:
   ```
   NODE_PATH=src/
   ```