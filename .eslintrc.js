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
        "linebreak-style": ["error", process.platform === "win32" ? "windows" : "unix"],
    },
    extends: ["eslint:recommended", "google"],
}