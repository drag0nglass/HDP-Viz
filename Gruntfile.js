// Generated on 2014-12-16 using
// generator-webapp 0.5.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Configurable paths
	var config = {
		app: 'app',
		bower: 'app/bower_components',
		server: 'server',
		dist: 'dist',
		distApp: 'dist/app',
		distServer: 'dist/server'
	};

	grunt.verbose;
	// Define the configuration for all the tasks
	grunt.initConfig({

		// Project settings
		config: config,

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			bower: {
				files: ['bower.json'],
				tasks: ['wiredep']
			},
			js: {
				files: ['<%= config.app %>/{,*/}*.js'],
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			},
			jstest: {
				files: ['test/spec/{,*/}*.js'],
				tasks: ['test:watch']
			},
			gruntfile: {
				files: ['Gruntfile.js'],
				options: {
					livereload: true
				}
			},
			styles: {
				files: ['<%= config.app %>/styles/{,*/}*.css'],
				tasks: ['newer:copy:styles', 'autoprefixer']
			},
			hapi: {
				files: ['<%= config.server %>/**/*.js'],
				tasks: ['hapi'],
				options: {
					spawn: false // Newer versions of grunt-contrib-watch might require this parameter.
				}
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
                    '<%= config.server %>/{,*/}*.js'
                ]
			}
		},

		hapi: {
			custom_options: {
				options: {
					docs: true,
					server: require('path').resolve('server/server.js'),
					port: '9001',
					bases: {
						'/app': require('path').resolve('./app/')
					}
				}
			}
		},

		// The actual grunt server settings
		connect: {
			options: {
				port: 9000,
				open: true,
				livereload: 35729,
				// Change this to '0.0.0.0' to access the server from outside
				hostname: 'localhost'
			},
			livereload: {
				options: {
					middleware: function (connect) {
						return [
                            connect.static('.tmp'),
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect.static(config.app)
                        ];
					}
				}
			},
			test: {
				options: {
					open: false,
					port: 9001,
					middleware: function (connect) {
						return [
                            connect.static('.tmp'),
                            connect.static('test'),
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect.static(config.app)
                        ];
					}
				}
			},
			dist: {
				options: {
					base: '<%= config.dist %>',
					livereload: false
				}
			}
		},

		// Empties folders to start fresh
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
                        '.tmp',
                        '<%= config.dist %>/**',
                        '!<%= config.dist %>/.git*',
                        '<%= config.dist %>'
                    ]
                }]
			},
			server: '.tmp'
		},

		// Make sure code styles are up to par and there are no obvious mistakes
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish'),
				node: true,
				ignores: ['<%= config.app %>/scripts/old/{,*/}*.js'],
				globals: {
					'd3': true,
					'HADOOPOPTS': true
				}
			},
			all: [
                '<%= config.server %>/server.js',
                '<%= config.app %>/scripts/{,*/}*.js'
            ]
		},

		// Mocha testing framework configuration options
		mocha: {
			all: {
				options: {
					run: true,
					urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
				}
			}
		},

		// Add vendor prefixed styles
		autoprefixer: {
			options: {
				browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
			},
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/styles/',
					src: '{,*/}*.css',
					dest: '.tmp/styles/'
                }]
			}
		},

		// Automatically inject Bower components into the HTML file
		wiredep: {
			app: {
				ignorePath: /^\/|\.\.\//,
				src: ['<%= config.app %>/index.html'],
				exclude: ['bower_components/bootstrap/dist/js/bootstrap.js']
			}
		},

		// Renames files for browser caching purposes
		rev: {
			dist: {
				files: {
					src: [
                        '<%= config.dist %>/scripts/{,*/}*.js',
                        '<%= config.dist %>/styles/{,*/}*.css',
                        '<%= config.dist %>/images/{,*/}*.*',
                        '<%= config.dist %>/styles/fonts/{,*/}*.*',
                        '<%= config.dist %>/*.{ico,png}'
                    ]
				}
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			options: {
				dest: '<%= config.distApp %>'
			},
			html: ['<%= config.app %>/index.html', '<%= config.app %>/{,*/}*.html']
		},

		// Performs rewrites based on rev and the useminPrepare configuration
		usemin: {
			options: {
				assetsDirs: [
                    '<%= config.distApp %>',
                    '<%= config.distApp %>/images',
                    '<%= config.distApp %>/styles'
                ]
			},
			html: ['<%= config.distApp %>/{,*/}*.html'],
			css: ['<%= config.distApp %>/styles/{,*/}*.css']
		},

		// The following *-min tasks produce minified files in the dist folder
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/images',
					src: '{,*/}*.{gif,jpeg,jpg,png}',
					dest: '<%= config.distApp %>/images'
                }]
			}
		},

		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/images',
					src: '{,*/}*.svg',
					dest: '<%= config.distApp %>/images'
                }]
			}
		},

		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					conservativeCollapse: true,
					removeAttributeQuotes: true,
					removeCommentsFromCDATA: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true,
					removeRedundantAttributes: true,
					useShortDoctype: true
				},
				files: [{
					expand: true,
					cwd: '<%= config.dist %>',
					src: '**/*.html',
					dest: '<%= config.dist %>'
                }]
			}
		},
		uglify: {
			options: {
				report: 'min'
			},
			dist: {
				files: {
					'<%= config.distApp %>/scripts/hdfsWorker.js': [
                        '<%= config.app %>/scripts/hdfsWorker.js'
                    ]
				}
			}
		},

		// By default, your `index.html`'s <!-- Usemin block --> will take care
		// of minification. These next options are pre-configured if you do not
		// wish to use the Usemin blocks.
		// cssmin: {
		//   dist: {
		//     files: {
		//       '<%= config.dist %>/styles/main.css': [
		//         '.tmp/styles/{,*/}*.css',
		//         '<%= config.app %>/styles/{,*/}*.css'
		//       ]
		//     }
		//   }
		// },
		// uglify: {
		//   dist: {
		//     files: {
		//       '<%= config.dist %>/scripts/scripts.js': [
		//         '<%= config.dist %>/scripts/scripts.js'
		//       ]
		//     }
		//   }
		// },
		// concat: {
		//   dist: {}
		// },

		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= config.app %>',
					dest: '<%= config.distApp %>',
					src: [
                        '*.{ico,png,gif,txt}',
                        'images/{,*/}*.webp',
                        '{,*/}*.html',
                        'styles/fonts/{,*/}*.*'
                    ]
                }, {
					src: '<%= config.server %>/**',
					dest: '<%= config.dist %>/'
                }, {
					src: 'package.json',
					dest: '<%= config.dist %>/'
                }, {
					//for bootstrap fonts
					expand: true,
					dot: true,
					cwd: '<%= config.bower %>/bootstrap/dist',
					src: ['fonts/*.*'],
					dest: '<%= config.distApp %>'
                }, {
					//for font-awesome
					expand: true,
					dot: true,
					cwd: '<%= config.bower %>/font-awesome',
					src: ['fonts/*.*'],
					dest: '<%= config.distApp %>'
                }]
			},
			styles: {
				expand: true,
				dot: true,
				cwd: '<%= config.app %>/styles',
				dest: '.tmp/styles/',
				src: '{,*/}*.css'
			}
		},

		// Run some tasks in parallel to speed up build process
		concurrent: {
			server: [
                'copy:styles'
            ],
			test: [
                'copy:styles'
            ],
			dist: [
                'copy:styles',
                'imagemin',
                'svgmin'
            ]
		},

		bump: {
			options: {
				commit: true,
				commitMessage: 'Release v%VERSION%',
				commitFiles: ['-a'],
				createTag: true,
				tagName: 'v%VERSION%',
				tagMessage: 'Version %VERSION%',
                push: false
			}
		},
	});


	grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function (target) {
		if (grunt.option('allow-remote')) {
			grunt.config.set('connect.options.hostname', '0.0.0.0');
		}
		if (target === 'dist') {
			return grunt.task.run(['build', 'connect:dist:keepalive']);
		}

		grunt.task.run([
            'clean:server',
            'wiredep',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'hapi',
            'watch'
        ]);
	});

	grunt.registerTask('startHapi', function (target) {
		grunt.task.run([
            'clean:server',
            'wiredep',
            'concurrent:server',
            'autoprefixer',
            'hapi',
            'watch'
        ]);
	});

	grunt.registerTask('test', function (target) {
		if (target !== 'watch') {
			grunt.task.run([
                'clean:server',
                'concurrent:test',
                'autoprefixer'
            ]);
		}

		grunt.task.run([
            'connect:test',
            'mocha'
        ]);
	});

	grunt.registerTask('build', [
        'clean:dist',
        'wiredep',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'rev',
        'usemin',
        'htmlmin'
    ]);

	grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);
};
