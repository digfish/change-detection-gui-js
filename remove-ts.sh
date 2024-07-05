
# https://medium.com/@simonescigliuzzi/using-javascript-instead-of-typescript-in-a-ionic-vue-app-411faee8a783

# 1. uninstall all related TS packages
npm uninstall --save typescript @types/jest @typescript-eslint/eslint-plugin @typescript-eslint/parser @vue/cli-plugin-typescript @vue/eslint-config-typescript

# 2. rename all TS files to JS files
find . -type d -name 'node_modules' -prune -type f -name '*.ts' -exec sh -c 'mv "$0" "${0%.ts}.js"' {} \;

# 3. Remove @vue/typescript/recommended and @typescript-eslint/no-explicit-any: ‘off’, from .eslintrc.jsfile.
sed -i -e '/@vue\/typescript\/recommended/d' -e "/@typescript-eslint\/no-explicit-any: 'off'/d" .eslintrc.js

# 4. Replace in tsconfig.json
sed -i '/"include": \[/,/\]/c\
"include": [\
  "src/**/*.js",\
  "src/**/*.vue",\
  "tests/**/*.js"\
]' tsconfig.json
 
# 5. Remove from src/router/index.js
sed -i -e 'import { RouteRecordRaw } from 'vue-router';' -e ": Array<RouteRecordRaw>"  src/router/index.js

# 6. Remove lang=ts from all vue files
find . -name '*.vue' -exec sed -i -e 'lang=\"ts\"' {} \;
