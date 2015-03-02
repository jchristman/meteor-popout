Package.describe({
  name: 'jchristman:popout',
  summary: 'Reactive popouts in a new window',
  version: '1.0.0',
  git: 'https://github.com/jchristman/meteor-popout'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0');

  api.use('underscore', 'client');
  api.use('templating', 'client');
  api.use('jquery', 'client');

  api.addFiles([
        'lib/popout.html',
        'lib/popout.js',
        'lib/popout.js',
  ],['client']);
});
