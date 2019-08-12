let browserSync=require('browser-sync').create();
let config=require('../config/config');
browserSync.init({
    server:{
        baseDir: config.dist,
        proxy: {
            target: "http://yourlocal.dev",
        }
    }
});