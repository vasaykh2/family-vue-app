module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "@vue/standard",
    "@vue/typescript/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    // Отключаем все проверки, связанные со стилем
    indent: "off", // Отступ
    semi: "off", // Точки с запятой
    quotes: "off", // Кавычки
    "comma-dangle": "off", // Запятые
    "space-before-function-paren": "off", // Пробелы перед скобками функций
    "space-infix-ops": "off", // Пробелы между операторами
    "no-trailing-spaces": "off", // Пробелы в конце строки
    "eol-last": "off", // Новый символ конца строки
    "vue/html-indent": "off", // Отступ в шаблонах HTML
    "vue/script-indent": "off", // Отступ в  `<script>`
    "vue/no-unused-vars": "off", // Неиспользуемые переменные
    "no-unused-vars": "off",
    "@typescript-eslint/indent": "off", // Отступ для TypeScript
    "@typescript-eslint/semi": "off", // Точки с запятой для TypeScript
    "@typescript-eslint/space-before-function-paren": "off", // Пробелы перед скобками функций для TypeScript
  },
};
