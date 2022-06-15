# Canonical Latest News

This project contains the JavaScript to display the latest blog posts of a given topic.

## Usage

Use a node package manager to install this component and then link the JS file beneath the template, with settings.

1. Install via yarn or npm

```bash
yarn add @canonical/latest-news
```

...or...

```bash
npm install @canonical/latest-news --save
```

2. You can then install the library either by directly linking to it or via ES6 imports.

To consume the library directly, add a link to the JS file containing an IIFE and run the `canonicalLatestNews.fetchLatestNews() function:

```html
<script src="/node_modules/@canonical/latest-news/dist/iife.js"></script>
<script>
  canonicalLatestNews.fetchLatestNews({
    /* options */
  });
</script>
```

To import it, simply call it from your site-wide JS file:

```javascript
import { fetchLatestNews } from "@canonical/latest-news";
fetchLatestNews({
  /* options */
});
```

### Templates

You will need a template that follows this structure to display the latest news feed:

```html
<div id="latest-news-container">
  Loading...
</div>

<template style="display:none" id="articles-template">
  <div class="article-image"></div>
  <h4><a class="article-link article-title"></a></h4>
  <p>
    <em><time datetime="" class="article-time"></time></em>
  </p>
</template>
```

The script will look for the following class names to use as hooks for content within the template:

- `article-time`: The time the article was published formatted as **2 May 2020**
- `article-link`: The permalink for the article
- `article-title`: The title of the article
- `article-image`: The featured image of the article
- `article-excerpt`: The excerpt of the article
- `article-group`: The group of the article


You can choose what content to display and how it will look by using the above classes. If you don't want a certain part of the content, for example the article image, then do not include an element with the class name of `article-image`.

### Options

You will need to pass some options to the script in order for it to know where the template is and where it should be rendered to. These are:

- `articlesContainerSelector`: String - The container where the articles will be displayed
- `articleTemplateSelector`: String - The template that will be used for the article
- `groupId`: Integer - Return posts in a specific group (Optional)
- `gtmEventLabel`: String - An event label used for Google Analytics (Optional)
- `hostname`: String - An optional hostname to be used for the permalink. By default the link is relative (Optional)
- `limit`: Integer - The number of posts to be returned. (Optional)
- `linkImage`: Boolean - Wrap the thumbnail image in a link (Optional)
- `spotlightContainerSelector`: String - The container where the spotlight article will be displayed
- `spotlightTemplateSelector`: String - The template that will be used for the spotlight article
- `tagId`: Integer - Return posts with a specific tag (Optional)

## Building

To build the JS into the `/dist` folder, run:

```
yarn build
```

### Watching the changed files

```
yarn watch
```

### Run the tests

```
yarn test
```

### Release process

The package is versioned using [semantic versioning](https://semver.org/) and published to the NPM registry.

To cut a new release run:

```
npm version [patch|minor|major]
```

This will trigger the `prepublishonly` script which will ensure requisite artefacts are built before publishing.

Code licensed LGPLv3 by Canonical Ltd.

With ♥ from Canonical
