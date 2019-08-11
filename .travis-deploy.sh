#!/usr/bin/env bash

echo Deploy to GitHub Pages
if [ "$TRAVIS_BRANCH" == "master"]; then
    echo Not on master, skipping deployment;
else
    echo Deploy to GitHub Pages - Start
    cd dist/apps/simbad-client
    git init

    git config user.name "Travis CI"
    git config user.email "jakub.sokolowski@gmail.com"

    git add .
    git commit -m "Deploy to GitHub Pages"
    git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1

    echo Deploy to GitHub Pages - Success

    echo Deploy docs to GitHub Pages  - Start
    cd ../../../docs/
    git init

    git config user.name "Travis CI"
    git config user.email "jakub.sokolowski@gmail.com"

    git add .
    git commit -m "Deploy docs GitHub Pages"
    git push --force --quiet "https://${GH_TOKEN}@${GH_DOC_REF}" master:gh-pages > /dev/null 2>&1

    echo Deploy docs to GitHub Pages - Success
fi
echo Deploy to GitHub Pages - Finish
