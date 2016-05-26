"use strict";

const npm = require('npm');
const semver = require('semver');

const pkgArray = process.argv[2].split('@');
const pkg = pkgArray[0];
const version = pkgArray[1];

npm.load({}, function(err, npm) {
    npm.commands.list([], true, function(err, pkgInfo) {
        Object.keys(pkgInfo._dependencies).forEach(name => {
            const requiredVersion = pkgInfo.dependencies[name]._dependencies[pkg];
            if (requiredVersion && !semver.satisfies(version, requiredVersion)) {
                console.log(`${name}@${pkgInfo._dependencies[name]} dependes on ${pkg}: ${requiredVersion}`);
            }
        });
    });
});
