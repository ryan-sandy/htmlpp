#!/usr/bin/env node

//Copyright 2013 Ryan Lee

'use strict';
/*jslint node:true, indent:2, nomen:true*/

var fs = require('fs');

var opts = process.argv.slice(2),
  i = 0,
  set = {
    'outfile' : null,
    'files' : [],
    'ext' : '.html',
    'open' : '<% ',
    'close' : ' %>',
    'include' : 'include ',
    'echo' : false
  },
  baseDir = process.cwd(),
  search = '',
  output = '';

var parse = function (raw) {
  var start = raw.indexOf(search),
    stop = 0,
    rep = '',
    include = '',
    fname = '',
    fnameExt = '';

  while (start !== -1) {
    stop = raw.indexOf(set.close, start);
    fname = raw.slice(start + search.length, stop);
    if (fname.split('.').length === 1) {
      fnameExt = fname + set.ext;
    } else {
      fnameExt = fname;
    }
    if (set.echo) {
      console.log('Including ' + fnameExt);
    }
    include = parse(fs.readFileSync(fnameExt, 'utf8').trim());
    rep = search + fname + set.close;
    if (raw.indexOf(rep + '\n') !== -1) {
      raw = raw.replace(rep + '\n', include);
    } else {
      raw = raw.replace(rep, include);
    }
    start = raw.indexOf(search);
  }
  return raw;
};

var printHelp = function () {
  console.log('Pre-processes html files.');
  console.log('Options:');
  console.log('-o [output filename]; default screen');
  console.log('-open [openDelimiter]; default <%');
  console.log('-close [closeDelimiter]; default %>');
  console.log('-inc [include Key Word]; default include ');
  console.log('-v; verbose');
};

for (i = 0; i < opts.length; i += 1) {
  if (opts[i][0] === '-') {
    switch (opts[i].slice(1)) {
    case 'o':
      i += 1;
      set.outfile = opts[i];
      break;
    case 'open':
      i += 1;
      set.open = opts[i];
      break;
    case 'close':
      i += 1;
      set.close = opts[i];
      break;
    case 'ext':
      i += 1;
      set.ext = opts[i];
      break;
    case 'inc':
      i += 1;
      set.include = opts[i];
      break;
    case 'v':
      set.echo = true;
      break;
    case 'h':
      printHelp();
      break;
    default:
      console.log('Error: Unknown option ' + opts[i]);
      process.exit(1);
      break;
    }
  } else {
    set.files.push(opts[i]);
  }
}

search = set.open + set.include;

set.files.forEach(function (f) {
  if (set.echo) {
    console.log('Compiling file:' + f);
  }
  var path, pos, name;
  pos = f.lastIndexOf('/');
  if(pos !== -1) {
    path = f.slice(0, pos);
    name = f.slice(pos + 1);
    process.chdir(path);
  } else {
    name = f;
  }
  output += parse(fs.readFileSync(name, 'utf8'));
  process.chdir(baseDir);
});

if (set.outfile) {
  fs.writeFileSync(set.outfile, output, 'utf8');
} else {
  console.log(output);
}
