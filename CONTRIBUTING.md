# Contributing to the IBM Watson Design Library

The Watson Design Library contains the design and development guidelines and resources for creating cognitive experiences. It's built using Sass and available via Bower, so it's easy to include all or part of it within your own project.

_**Heads Up!** We love open source, but the Watson Design Library is unlikely to add new guidelines or features that are not in-line with the work we're doing or won't be used at IBM Watson. Inclusion is at the discretion of the Watson Design team. We really love to share, though, so hopefully that means we're still friends :blue_heart:_

## Navigating the Repository

There are three main folders of concern for those interested in contributing: `language`, `library`, and `patterns`.

### Language

The `language` folder contains all of the long-form text available and its related assets, with the exception of documentation for individual UI patterns. All content in here follows our [Guideline](https://github.com/IBM-Watson/design-library/wiki/Content-Models#guideline) content model. Within these, there are a number of [Secondary Content Types](https://github.com/IBM-Watson/design-library/wiki/Content-Models#secondary-content-types) that can be used as sub-content. Assets to be downloaded by a user should go in to `language/assets`, images should go in to `language/images`, and videos should go in to `language/videos`. Within each of those folders, assets should be sorted in to sub-folders based on the sub-folder their related content is sorted into.

### Library

The `library` folder contains all of the items needed to compile the content in the `language` and `patterns` folders into the Watson Design Library website. This includes site-specific Sass, JavaScript, configuration, and templates.

### Patterns

The `patterns` folder contains all of the UI patterns and their documentation. Development is being done following [North's](http://pointnorth.io/#website-building-blocks) naming conventions and best practices. Any code that does not adhere to North's conventions will be asked to be rewritten. The folder is divided in to four parts, [base](https://github.com/IBM-Watson/design-library/tree/develop/patterns/base#base-elements), [components](https://github.com/IBM-Watson/design-library/tree/develop/patterns/components#components), [layouts](https://github.com/IBM-Watson/design-library/tree/develop/patterns/layouts#layouts), and [core](https://github.com/IBM-Watson/design-library/tree/develop/patterns/core#core).

No patterns rely upon JavaScript frameworks (jQuery, Dojo, Angular, etc…). Any pattern submissions that do will be asked to be rewritten without said dependencies. Acceptable JavaScript dependencies include core JavaScript that we provide and any current dependencies already included in the project. Any additional external dependencies will need to be approved before they can be used. Styling should be written without vendor prefixes. Only web standard features that have [moved beyond](http://en.wikipedia.org/wiki/World_Wide_Web_Consortium#Specification_Maturation) the Candidate Recommendation stage (or equivalent for the relevant standards body) will be considered for inclusion.

## Submitting Issues

* Before creating a new issue, perform a [cursory search](https://github.com/issues?utf8=%E2%9C%93&q=is%3Aissue+user%3Aibm-watson+) to see if a similar issue has already been submitted.
* You can create an issue [here](https://github.com/IBM-Watson/design-library/issues). Please include as many details as possible in your report.
* Issue titles should be descriptive, explaining at the high level what it is about, and should be written in the same style as [Git commit messages](#git-commit-messages).
* Please include the version of the Design Library you are using/viewing
* Do not open a [pull request](#pull-requests) to resolve an issue without first receiving feedback from a `collaborator` or `owner` and having them agree on a solution forward.
* Include screenshots and animated GIFs whenever possible; they are immensely helpful.
* When submitting a browser bug, please include the browser, version, operating system, and operating system version.
* When submitting an update to or a new feature, pattern, guideline, etc… we prefer to see user research associated with the suggestion including testing methods, results, and sample size, whenever possible. This allows us to make more user-centered decisions and cut through assumptions and individual preferences.
* Issues that have a number of sub-items that need to be complete should use [task lists](https://github.com/blog/1375%0A-task-lists-in-gfm-issues-pulls-comments) to track the sub-items in the main issue comment.


## Pull Requests

* **DO NOT ISSUE A PULL REQUEST WITHOUT FIRST [SUBMITTING AN ISSUE](#submitting-issues)**
* Pull requests should reference their related issues. If the pull request closes an issue, [please reference its closing in your commit messages](https://help.github.com/articles/closing-issues-via-commit-messages/). Pull requests not referencing any issues will be closed.
* Pull request titles should be descriptive, explaining at the high level what it is doing, and should be written in the same style as [Git commit messages](#git-commit-messages).
* Update the `CHANGELOG` with the changes made by your pull request, making sure to use the proper [Emoji](#emoji-cheatsheet).
* Make sure you have [installed the development environment](https://github.com/IBM-Watson/design-library#installation), [updated your runner to the latest version](https://github.com/IBM-Watson/design-library#updating-the-runner), and have [run the library locally](https://github.com/IBM-Watson/design-library#running-locally) to ensure that your code works properly.
* Follow our JavaScript and CSS styleguides. We have linters set up to catch most of it.
* Ensure that you have [EditorConfig](http://editorconfig.org/) installed in your editor of choice and that it is functioning properly.
* Do not squash or rebase your commits when submitting a Pull Request. It makes it much harder to follow your work and make incremental changes.
* Update the [CHANGELOG](#maintaining-thechangelog) with your changes.
* Ensure no Emoji tags are used in the title of your Pull Request

### Git Commit Messages

* Use the present tense (`"Add feature"` not `"Added Feature"`)
* Use the imperative mood (`"Move cursor to…"` not `"Moves cursor to…"`)
* Limit the first line to 72 characters or less
* Include relevant Emoji from our [Emoji cheatsheet](#emoji-cheatsheet)

### Branching Model

* Branches must be made off of the most current `develop` branch from `git@github.com:IBM-Watson/design-library.git`
* Pull requests must be made into our [develop](https://github.com/IBM-Watson/design-library/tree/develop) branch.
* The following branch prefixes should be used when creating a new branch:
  * `hotfix/` - bug fixes that got through and need to be squashed
  * `pattern/` - update to or new pattern to be added
  * `language/` - update to or new piece of long-form text or assets to go along with it
  * `library/` - update to or new code for the site
  * `release/` - for releases
  * `feature/` - update to or new general feature not covered by other prefixes

## Creating a New Version

Versioning is done through [SEMVER](http://semver.org/). When creating a new version, issue a [pull request](#pull-requests) from `develop` into `master` and create new release branch off of `master` with the version's name, and create a new tag with `v` prefixed with the version's name from that branch. 

For instance, if you are creating version `1.1.0`, you would start by merging `develop` into `master`, create a branch `release/1.1.0` from `master`, and create a tag `v1.1.0` from branch `release/1.1.0`.

### Maintaining the Changelog

The Changelog should have a list of changes made for each version. They should be organized so additions come first, changes come second, and deletions come third. Version numbers should be 2nd level headers with the `v` in front (like a tag) and the date of the version's most recent update should be underneath in italics.

Changelog messages do not need to cover each individual commit made, but rather should have individual summaries of the changes made. Changelog messages should be written in the same style as [Git commit messages](#git-commit-messages).

## Emoji Cheatsheet

When creating creating commits or updating the CHANGELOG, please **start** the commit message or update with one of the following applicable Emoji. Emoji should not be used at the start of issue or pull request titles.

* :art: `:art:` when improving the format/structure of the code
* :racehorse: `:racehorse:` when improving performance
* :memo: `:memo:` when writing long-form text (documentation, guidelines, principles, etc…)
* :bug: `:bug:` when fixing a bug
* :fire: `:fire:` when removing code or files
* :green_heart: `:green_heart:` when fixing the CI build
* :white_check_mark: `:white_check_mark:` when adding tests
* :lock: `:lock:` when dealing with security
* :arrow_up: `:arrow_up:` when upgrading dependencies
* :arrow_down: `:arrow_down:` when downgrading dependencies
* :shirt: `:shirt:` when removing linter warnings
* :shipit: `:shipit:` when creating a new release
