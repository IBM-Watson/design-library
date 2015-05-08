# Watson Design Library Changelog

## v1.0.0-rc.1
*May 5, 2015*

**New**

* Add JavaScript config for rendering the site's JavaScript
* Add Apache 2.0 and CC-BY licenses! All source code is licensed under the Apache 2.0 license, documentation and assets under the CC-BY license
* Add Bottom (previous/next) Nav

**Changes**

* Move `_base.scss`, `_components.scss`, `_layouts.scss`, and `_core.scss` to `_index.scss` to better align with Node importing
* Rename `crick.scss` to `_watson-patterns.scss` to distribute as a partial and align name
* Add `library` Sass file and folder
* Add prefixes to folders so that they display in the correct order

## v1.0.0-beta.3
*April 28, 2015*

**New**

* :memo: Add the CHANGELOG
* Add `aside`, `detail`, `example`, and `quote` [sub-content](https://github.com/IBM-Watson/design-library/wiki/Content-Models#secondary-content-types) templates (`color` existed previously, `media` is a view of `example` and `detail`)
* :memo: Update to Accessibility guidelines
* :memo: Update to Branding guidelines
* :memo: Add Design principles
* :memo: Add Grid guidelines
* :memo: Add Style guidelines
* :green_heart: Add Travis CI integration
* Add CNAME record

**Changes**

* :memo: Update the Contributing guidelines
* Update `layout` template to use new navigation variables
* :fire: Delete outdated color Wordmark and Logotype SVGs
* :art: Replace updated color Wordmark and Logotype SVGs
