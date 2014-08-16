/**
 * Module Dependencies
 */

var readfile = require('fs').readFileSync;
var readdir = require('fs').readdirSync;
var rmrf = require('rimraf').sync;
var join = require('path').join;
var assert = require('assert');
var Duo = require('duo');
var gulp = require('..');
var vm = require('vm');

/**
 * Gulp plugins
 */

var coffee = require('gulp-coffee');
var uncss = require('gulp-uncss');
var less = require('gulp-less');

/**
 * Tests
 */

describe('duo-gulp', function() {

  beforeEach(function(){
    cleanup();
  });

  describe('gulp(plugin)', function() {
    it('should work with gulp-coffee', function *() {
      var duo = create('coffee', 'index.coffee');
      duo.use(gulp(coffee)());
      var js = yield duo.run();
      var ctx = evaluate(js).main;
      assert('a' == ctx.a);
      assert('b' == ctx.b);
    });

    it('should work with gulp-less', function *() {
      var duo = create('less', 'index.less');
      duo.use(gulp(less)());
      var css = yield duo.run();
      assert(css == read('less/build.css'));
    })

    it('should work with options', function *() {
      var duo = create('uncss', 'index.css');

      duo.use(gulp(uncss)({
        html: '<html><head></head><body><header class="title">hi!</header></body>'
      }));

      var css = yield duo.run();
      assert(css == read('uncss/build.css'));
    })
  })

  describe('gulp(glob, plugin)', function() {
    it('should filter plugins based on `glob`', function *() {
      var duo = create('less', 'index.less');
      duo.use(gulp('*.coffee', coffee)());
      duo.use(gulp('*.less', less)());
      var css = yield duo.run();
      assert(css == read('less/build.css'));
    })
  });

});

/**
 * Path
 *
 * @param {String} fixture
 * @return {String}
 */

function path(fixture) {
  var paths = [__dirname, 'fixtures'].concat(fixture.split('/'));
  return join.apply(join, paths);
}

/**
 * Cleanup
 */

function cleanup(){
  var dir = join(__dirname, 'fixtures');
  var dirs = readdir(dir);
  dirs.forEach(function(name){
    if ('.' == name[0]) return;
    var components = join(dir, name, 'components');
    rmrf(components);
  });
}

/**
 * Read the file
 *
 * @param {String} file
 * @return {String}
 */

function read(file) {
  file = path(file);
  return readfile(file);
}

/**
 * Create a duo plugin
 *
 * @param {String} root
 * @param {String} entry (optional)
 */

function create(root, entry) {
  entry = entry || 'index.js';
  root = path(root);

  return Duo(root)
    .entry(entry);
}

/**
 * Evaluate `js`.
 *
 * @param {String} js
 * @param {Object} ctx (optional)
 * @return {Object}
 */

function evaluate(js, ctx){
  var ctx = ctx || { window: {}, document: {} };
  vm.runInNewContext('main =' + js + '(1)', ctx, 'main.vm');
  vm.runInNewContext('require =' + js + '', ctx, 'require.vm');
  return ctx;
}
