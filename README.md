## Installation

Clone the repository, cd into the directory, and install the dependencies:
```
npm install
```

## Gitflow

Use the Gitflow to work on this project:
- Clone the repo from the dev branch
- Create a new local branch to work on
- Check in and add comments to changes on local branch
- Push new local branch to remote on Newsource/bitbucket 
- Do a pull request of your changes to the Dev branch 

If all changes are good on dev branch Admin or someone from the Architecture team will merge into Master.  
All Master merges from Dev branch will be rebased to remove history.

## Development

To run development mode, type the command: `gulp serve`
The application will start on port 9000 with hot module replacement (HMR) turned on.

## Production

To build the application, type the command: `gulp build`

## Architecture

The application-wide module is found in index.js. 
Index.js is to contain all external dependencies, as well as the `loader` module.
The loader module is responsible for requiring all angular 1 components. 

All modules that export the module object are in the dependency list of `loader`. For example:

```javascript
module.exports = angular.module('myNewModule');
```

## Running unit tests

Run `gulp test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `gulp e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). 

## Running Reports

Run `gulp reports` to execute the all of the current reports. 

## Hot Module Replacement

The following files and naming conventions have HMR turned on in dev:
 - Controllers with filenames ending in `.controller.js`
 - Templates with filenames ending in `.html`
 - Services with filenames ending in `.service.js`
 - Factories with filenames ending in `.factory.js`
 - Filters with filenames ending in `.filter.js`
 - Directives with filenames ending in `.directive.js`

The following files are required through the loader, but refresh the browser (as they are configuration):
 - Providers ending in `.provider.js`
 - Constants ending in `.constant.js`
 - Values ending in `.value.js`
 - Configs ending in `.config.js`
 - Runs ending in `.run.js`
 - Decorators ending in `.decorator.js`
 
 ## Backlog of functionality remaining
  
Type	Story											PTS
DOC		DOC - Angular 2.0 Upgrade Path					3
DEV		DEV - Angular 2.0 Upgrade Path					5
DOC		DOC - PDL/Analytics for NG 2 Architecture		3
DEV		DEV - PDL/Analytics for NG 2 Architecture		5
DOC		DOC - Search on the CSL-WebPlatform				3
DEV		DEV - Search on the CSL-WebPlatform				5
DOC		DOC - AEM/NG Authoring Patterns & Guidelines	3
DEV		DEV - AEM/NG Authoring Patterns Implementation	5
DEV		DEV - Authentication OAuth2 Integration			5
DEV		DEV - Angular 2 / AEM 6.X Interaction patterns	5
DOC		DOC – AEM NG 2 Page Personalization				3
DEV		DEV – AEM NG 2 Page Personalization				5
DOC		DOC - Angular 2.0 and CQ5.6 Support				5
DEV		DEV- AEM CQ6 and NG2 for CMS platform			5
DOC		DOC- Angular 2.0 Component Architecture			3
DOC		DOC- UI NG 2.0 Performance Best Practices		5
DOC		DOC - 2.0 TS E2E & Unit Testing Guidelines		3
DOC		DOC - 2.0 TS Development Guidelines				3
DOC		DOC - API needed CSL-Platform team for NG UI	3
DEV		DEV - API needed CSL-Platform team for NG UI	5
DOC		DOC - IDE Recommendation						3
DOC		DOC – AEM Preview Environment					3
DEV		DEV – AEM Preview Environment					5
DOC		DOC – NG 2.0 Security Architecture				3
DEV		DEV - Authentication OAuth2 Integration			5
DOC		DOC – NG 2.0 Data persistence					3
DEV		DEV – NG 2.0 Protected Routes					5
DOC		DOC – NG 2.0 Sanky Graph API Reporting			3
DOC		DOC - 2.0 TS E2E & Unit Testing Guidelines		5
DOC		DOC - Adobe Marketing Cloud Integration			5
DOC		DOC - CDN Integration							3
DOC		DOC - Modularize 3rd Party integration 			3
DOC		DOC - NativeScript export to mobile app			3
DOC		DOC - Angular Material 2 for Accessibility		3
DOC		DOC - AME/NG Preview Environment				3
DEV		DEV - Components Performance Report Slow/Comps  5

 
