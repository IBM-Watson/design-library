# Watson Design Library [![Issues In Progress](https://badge.waffle.io/ibm-watson/design-library.svg?label=In%20Progress&title=Issues%20In%20Progress)](http://waffle.io/ibm-watson/design-library) [![Build Status](https://travis-ci.org/IBM-Watson/design-library.svg?branch=develop)](https://travis-ci.org/IBM-Watson/design-library)


## Getting Started

Development on the Watson Design Library is done in this repository. Patterns are developed in the `patterns/` folder, with enhancementsto the library itself and the language are added to the `library/` folder. The design library runs off of the [Watson Runner](https://github.com/IBM-Watson/runner), so work on that should be done there.

### Installation

Development is done through a Vagrant VM. Please install the [Watson Development Environments](https://github.com/IBM-Watson/environments/blob/gh-pages/README.md#ibm-watson-development-environments) requirements. You will also need [Bower](http://bower.io/) installed.

After [forking and cloning](https://guides.github.com/activities/forking/) the repository, either open your terminal, [`cd` to the cloned folder](http://blog.teamtreehouse.com/introduction-to-the-mac-os-x-command-line), and run `bower install` followed by `vagrant up` (Mac, Unix, Windows), or run the **Bower Install** app followed by the **Vagrant Start** app from inside the `helper-apps` directory (Mac).

### Updating The Runner

The runner will be updated from time to time. To get these updates, either open your terminal, `cd` to the cloned folder, and run `vagrant provision`, or run the **Vagrant Update** app from inside the `helper-apps` directory.

### Running Locally

To run the design library site locally, either open your terminal, `cd` to the cloned folder, and run `vagrant ssh -c 'gulp'`, or run the **Server Refresh** app followed by the **Server Start** app from inside the `helper-apps` directory.
