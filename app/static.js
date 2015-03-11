'use strict';

// script assumes process.cwd() is the output directory
var outputDir = process.cwd();

require('node-jsx').install({ extension: '.jsx' });

var _ = require('lodash');
var React = require('react');
var Router = require('react-router');
var HeadParams = require('./lib/HeadParams');
var StaticTools = require('./lib/StaticTools');
var htmlComponent = React.createFactory(require('./components/Html'));

var routes = require('./components/Routes');
var Collections = require('./components/Collections');

// Interrogate the router for the route definitions and interpolate path
// components for products and careers

var productNames = _.pluck(Collections.Products, 'name');
var jobNames = _.pluck(Collections.Jobs, 'name');

var pages = StaticTools.gather(routes);
pages = StaticTools.interpolate(pages, '/what/:name', 'name', productNames);
pages = StaticTools.interpolate(pages, '/careers/:name', 'name', jobNames);

// Write the sitemap with the pages we have so far
StaticTools.writeFile(outputDir, '/sitemap.xml', 
  StaticTools.makeSitemap(pages, 'http://percolatestudio.com'));

// Will hit the NotFound route and generate error.html
pages.push('/error.html');

var headParams = new HeadParams();

// Render each path
pages.forEach(function(page) {
  Router.run(routes, page, function (Handler, state) {
    console.log(page);
    var bodyElement = React.createFactory(Handler)({
      params: state.params,
      headParams: headParams,
      clientReady: false
    });

    var html = React.renderToStaticMarkup(htmlComponent({
      headParams: headParams,
      markup: React.renderToString(bodyElement)
    }));

    StaticTools.writeHtmlPage(outputDir, page, html);
  });
});
