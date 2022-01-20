const browserSync = require('browser-sync');
const gulp = require('gulp');
const path = require('path');
const server = browserSync.create('dev');
gulp.task('dev', () => {
    server.init({
        open:false,
        server: {
            baseDir: [path.resolve(__dirname, './src')],
            // baseDir:'/Users/tckxjzc/Documents/github/netfix',
            routes:{
                "/static":path.resolve(__dirname, './static'),
            },
            // baseDir: '/Volumes/XData/AndroidStudioProjects/flutter_hello/flutter_hello/build/web'
        },
        // rewriteRules: [
        //     {
        //         match: /\/static/,
        //         fn: function (match) {
        //             return '/';
        //         }
        //     }
        // ]
    });
    gulp.watch(['./src/**/*'])
        .on('change', (file) => {
            console.log(`${file}--changed`);
            server.reload();
        });
    // gulp.watch(['./src/**/*'],{events:'all'},(cb,e)=>{
    //     server.reload();
    //     cb();
    // })

});