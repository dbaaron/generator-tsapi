'use strict';

var yeoman = require('yeoman-generator'),
    mkdirp = require('mkdirp'),
     chalk = require('chalk'),
     yosay = require('yosay'),
     memfs = require('mem-fs'),
    editor = require('mem-fs-editor');

var TypeScriptApiGenerator = yeoman.generators.Base.extend({

    constructor: function() {
        yeoman.generators.Base.apply(this, arguments);
        console.log(yosay('\'Allo \'allo! Out of the box I include Typescript, gulp, and TSD.'));
    },

    // Prompt user
    askFor: function() {
        var done = this.async();

        // Create prompts
        var prompts = [
            {
                name: "appName",
                message: "What is your app\'s name?",
                default: "typescript-api"
            }
        ];

        // Bind prompts
        this.prompt(prompts, function(val) {
            this.appName = val.appName;
            done();
        }.bind(this));
    },

    // Folder scaffolding
    scaffolding: function() {
        mkdirp("server");
        console.log("\n" + chalk.red("Folders Created\n"));
    },

    // Copy files
    writing: {

        package: function() {
            console.log("TEST PACKAGE");
            this.fs.copy(
                this.templatePath('_package.json'),
                this.destinationPath('package.json')
            );
        },

        git: function() {
            this.fs.copy(
                this.templatePath('_gitignore'),
                this.destinationPath('.gitignore')
            );
        },

        gulp: function() {
            this.fs.copy(
                this.templatePath('_gulpfile.js'),
                this.destinationPath('gulpfile.js')
            );
        },

        tsd: function() {
            this.fs.copy(
                this.templatePath('_tsd.json'),
                this.destinationPath('tsd.json')
            );
        },

        main: function() {
            this.fs.copy(
                this.templatePath('_index.ts'),
                this.destinationPath('server/index.ts')
            );
        },

        misc: function() {
            console.log(chalk.red("Files Generated"));
        },

    },

    // Install
    install: function() {
        this.installDependencies();
        this.spawnCommand('tsd', ['install']);
    },

    // Install typings
    installTypings: function() {
        // this.spawnCommand('tsd', ['install'], function() {
        //     console.log("\n" + chalk.blue("TSD") + chalk.pink(" dependencies installed\n"));
        // });
        // console.log("TEST types");
    }

});

module.exports = TypeScriptApiGenerator;
