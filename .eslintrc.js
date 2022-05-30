module.exports = {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/vue3-essential",
      "eslint:recommended"
    ],
    "parserOptions": {
      "parser": "@babel/eslint-parser"
    },
    "rules": {
      "no-unused-vars" : process.env.NODE_END === "production" ? "error" : "warn",
      "eslint-disable-next-line" : process.env.NODE_END === "production" ? "error" : "off"
    }
  }