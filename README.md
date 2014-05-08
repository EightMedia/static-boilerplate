# Static site boilerplate

## Features
### Webpack
Files in `/src/assets/js/` make use of [Webpack](http://webpack.github.io). You can find the config in `/webpack.config.js`.

### Jade templates
The [jade](http://jade-lang.com/) files inside `/src/` are being compiled to .html and placed inside `/httpdocs/`. The folder `/src/includes/` is excluded and can be used to place inclusions/mixins in. The file `/src/context.js` is included when compiling the templates.

### Sass, with auto vendor-prefixes
The CSS is being build with [node-sass](https://github.com/andrew/node-sass), and the vendor prefixes are magicly being added by [Autoprefixer](https://github.com/ai/autoprefixer).

### Image compression
JPG, PNG, GIF and SVG files inside `/src/assets/img/` are being compressed and copied to `/httpdocs/assets/img/`.

### Live reload
Changed to you CSS and HTML update in the browser without pressing F5.
