# Vue 3 + Vite + Pinia + Router + Tailwind + Pug + Typescript template

Hello, world!

That starter for rapid prototyping a services. Start with

    git clone https://github.com/FlameArt/vuestarter.git ./projectName

## Under the hood

* Vite
* Vue 3 [via composition api]
* Typescript
* Pinia as state manager
* Vue Router 4
* Tailwind as css framework
* Pug as html framework
* ESLint
* Capacitor as converter to Android and iOS apps
* VSCode ready with Volar
* [FlameREST](https://github.com/FlameArt/auto-rest-template-yii2) attached
* Precreated Signup, Auth and Password Reset pages

# VSCode improvements

Pug-lexer in Volar doesn`t support all tailwind functions currently. So you need to apply fix https://github.com/pugjs/pug/pull/3373

OR just fix the `Volar` extension directly in `%USERNAME%/.vscode/extensions/vue.volar-VERSION/dist/node/server.js` that

    (/^\.([_a-z0-9\-]*[_a-z][_a-z0-9\-]*)/i, 'class');

to that

    (/^\.([_a-z0-9\-]*[_a-z]([_a-z0-9\-\[\]]|:(?! ))*)/i, 'class');

Compilation works fine without any fixes

# Licenses
MIT