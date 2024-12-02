# Curs AP1

Presentacions de les classes d'AP1 per GCED.

# Pàgines

Les pàgines en _markdown_ es troben a `src/slides`
i s'han de posar a `src/templates/index.jade`.

Es pot tocar la configuració amb els fitxers `src/styl/main.styl`
i `src/js/main.js`.

# Requiriments

Aquest projecte utilitza:

- [remark](https://github.com/gnab/remark)
- [Gulp](http://gulpjs.com/)
- [Jade](http://jade-lang.com/)
- [Stylus](http://learnboost.github.io/stylus/)
- [remark-boilerplate](https://github.com/brenopolanski/remark-boilerplate)

# Tasques

- `gulp`: Initialize watch for changes and a server (localhost:3000);
- `gulp js`: Execute js files;
- `gulp stylus`: Compile stylus files;
- `gulp imagemin`: Compress image files;
- `gulp watch`: Call for watch files;
- `gulp jade`: Compile jade files;
- `gulp deploy-pages`: Deploy compiled files at `build` to `github` on branch `gh-pages`.
