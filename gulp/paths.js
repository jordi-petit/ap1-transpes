'use strict';

module.exports = {
    source : {
        templates : './src/templates/**/*.jade',
        slides : './src/slides/**/*.md',
        js : './src/js/**/*.js',
        coffee : './src/coffee/**/*.coffee',
        styl : './src/styl/**/*.styl',
        img : './src/img/**/*',
        pdf : './src/pdf/**/*',
        zip : './src/zip/**/*',
        files : {
            jade : './src/templates/**/*.jade',
            styl : './src/styl/main.styl'
        }
    },

    browserSync : {
        html : './build/**/*.html',
        css : './build/css/**/*.css',
        js : './build/js/**/*.js',
        coffee : './build/coffee/**/*.coffee',
        img : './build/img/**/*',
        pdf : './build/pdf/**/*',
        zip : './build/zip/**/*'
    },

    build : {
        html : './build/',
        css : './build/css',
        js : './build/js',
        coffee : './build/coffee',
        img : './build/img',
        pdf : './build/pdf',
        zip : './build/zip'
    },

    deploy : {
        pages : './build/**/*'
    }
};
