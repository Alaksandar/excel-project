module.exports = {
    parser: "@babel/eslint-parser",
    parserOptions: {
        babelOptions: {
            configFile: "./babel.config.json",
        },
    },
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    rules: {
        "semi": "off",
        "arrow-parens": "off",
        "comma-dangle": "off",
        "require-jsdoc": "off",
        "operator-linebreak": "off",
        "indent": "off",
        "space-before-function-paren": "off",
        "space-before-blocks": "off",
        "eol-last": "off",
        "quotes": "off",
        "no-trailing-spaces": "off",
        "padded-blocks": "off",
        "no-unused-vars": "off",
        "keyword-spacing": "off",
        "no-multi-spaces": "off",
        "linebreak-style": ["error", process.platform === "win32" ? "windows" : "unix"],
    },
    extends: ["eslint:recommended", "google"],
}