'use strict';

const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');
const _ = require('lodash');

module.exports = yeoman.Base.extend({

    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the ' + chalk.red('d8-theme') + ' generator!'
        ));

        // User options
        var prompts = [{
            type: 'input',
            name: 'name',
            message: 'Theme Name?',
            default: 'Home'
        }];

        this.prompt(prompts, function (props) {
            this.props = props;
            // To access props later use this.props.<answer>;
            done();
        }.bind(this));
    },

    writing: function () {


        // Data preparation
        var nameUpper = this.props.name;
        var nameLower = this.props.name.charAt(0).toLowerCase() + this.props.name.slice(1);
        var nameDashed = nameLower.replace(/([A-Z])/g, function ($1) {
            return "-" + $1.toLowerCase();
        });

        var dest = './' + nameLower + '/';

        // Create component directory
        mkdirp(nameLower, function (err) {
            if (err) {
                this.log.error(err);
                process.exit(1);
            }
        }.bind(this));


        // info.yml
        this.fs.copyTpl(
            this.templatePath('_template.info.yml'),
            this.destinationPath(dest + nameLower + '.info.yml'), {
                name: nameLower
            });

        // libraries.yml
        this.fs.copyTpl(
            this.templatePath('template.libraries.yml'),
            this.destinationPath(dest + nameLower + '.libraries.yml')
        );

        // basic templates
        this.fs.copyTpl(
            this.templatePath('templates'),
            this.destinationPath(dest + 'templates')
        );

        // bootstrap min css
        this.fs.copyTpl(
            this.templatePath('style/bootstrap.min.css'),
            this.destinationPath(dest + 'style/bootstrap.min.css')
        );

        // bootstrap min js
        this.fs.copyTpl(
            this.templatePath('js/bootstrap.min.js'),
            this.destinationPath(dest + 'js/bootstrap.min.js')
        );

        // Sass
        this.fs.copyTpl(
            this.templatePath('style/style.scss'),
            this.destinationPath(dest + 'style/style.scss')
        );

    },

    install: function () {
    }
});
