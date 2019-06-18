Package.describe({
  "name": "igorescobar:jquery-mask-plugin",
  "version": "1.14.15",
  "summary": "A jQuery Plugin to make masks on form fields and HTML elements.",
  "git": "git@github.com:igorescobar/jQuery-Mask-Plugin.git",
  "documentation": "README.md"
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.addFiles('dist/jquery.mask.js', 'client');
  api.addFiles('dist/jquery.mask.min.js', 'client');
});
