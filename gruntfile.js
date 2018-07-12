module.exports = function(grunt){

    grunt.initConfig({
        watch: {
            html: {
                files: ['views/**'],
                options: {
                    livereload: true
                }
            },
            js:{
                files: ['public/js/**','models/**/*.js','schemas/**/*.js'],
                // tasks: ['jshint'],
                options: {
                    livereload: true
                }
            }
        },

        nodemon: {
            dev: {
                script: 'app.js',
                options: {
                    args: [],
                    ignoredFiles: ['README.md','node_modules/**','.DS_Store'],
                    watchedExtensions: ['js'],
                    watchFolders: ['./'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            tasks: ['nodemon','watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-watch')   //监听数据更改
    grunt.loadNpmTasks('grunt-nodemon')   // 监听app.js
    grunt.loadNpmTasks('grunt-concurrent')

    grunt.option('force',true)
    grunt.registerTask('default',['concurrent'])
}