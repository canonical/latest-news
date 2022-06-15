function revealSection() {
  var latestNewsSection = document.querySelector("[data-js='latest-news']");

  if (latestNewsSection) {
    latestNewsSection.classList.remove("u-hide");
  }
}

function formatDate(date) {
  var parsedDate = new Date(date);
  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    parsedDate.getDate() +
    " " +
    monthNames[parsedDate.getMonth()] +
    " " +
    parsedDate.getFullYear()
  );
}

function articleDiv(article, articleTemplateSelector, options) {
  var articleFragment = getTemplate(articleTemplateSelector);
  var time = articleFragment.querySelector(".article-time");
  var link = articleFragment.querySelector(".article-link");
  var title = articleFragment.querySelector(".article-title");
  var image = articleFragment.querySelector(".article-image");
  var author = articleFragment.querySelector(".article-author");
  var excerpt = articleFragment.querySelector(".article-excerpt");
  var group = articleFragment.querySelector(".article-group");
  var url = "";
  var imageLink = document.createElement("a");

  if (options.hostname) {
    url = "https://" + options.hostname;
  }

  var articleImage;

  if (
    article._embedded &&
    article._embedded["wp:featuredmedia"] &&
    article._embedded["wp:featuredmedia"][0] &&
    article._embedded["wp:featuredmedia"][0].media_details &&
    article._embedded["wp:featuredmedia"][0].media_details.width &&
    article._embedded["wp:featuredmedia"][0].media_details.height
  ) {
    var media = article._embedded["wp:featuredmedia"][0];
    articleImage = {
      url: media.source_url,
      alt: media.alt_text,
      width: media.media_details.width,
      height: media.media_details.height,
    };
  }

  if (author) {
    author.innerHTML = article.author.name;
  }

  if (excerpt) {
    excerpt.innerHTML = article.excerpt.rendered;
  }

  if (group) {
    group.innerHTML = article.group.name;
  }

  if (time) {
    time.setAttribute("datetime", article.date);
    time.innerText = formatDate(article.date);
  }

  if (link) {
    link.href = url + "/blog/" + article.slug;

    if (options.gtmEventLabel) {
      link.onclick = function () {
        dataLayer.push({
          event: "GAEvent",
          eventCategory: "blog",
          eventAction: options.gtmEventLabel + " news link",
          eventLabel: article.slug,
        });
      };
    }
  }

  if (title) {
    title.innerHTML = article.title.rendered;
  }

  if (image && articleImage && options.linkImage) {
    imageLink.href = url + "/blog/" + article.slug;
    image.appendChild(imageLink);
  }

  if (image && articleImage) {
    var img = document.createElement("img");
    img.setAttribute("src", articleImage.url);
    img.setAttribute("alt", articleImage.alt);
    img.setAttribute("width", articleImage.width);
    img.setAttribute("height", articleImage.height);

    if (options.linkImage) {
      imageLink.appendChild(img);
    } else {
      image.appendChild(img);
    }
  }

  return articleFragment;
}

function getTemplate(selector) {
  var template = document.querySelector(selector);
  var fragment;

  if ("content" in template) {
    fragment = document.importNode(template.content, true);
  } else {
    fragment = document.createDocumentFragment();

    for (var i = 0; i < template.childNodes.length; i++) {
      fragment.appendChild(template.childNodes[i].cloneNode(true));
    }
  }

  return fragment;
}

function latestArticlesCallback(options) {
  return function (event) {
    var articlesContainer = document.querySelector(
      options.articlesContainerSelector
    );

    if (articlesContainer) {
      while (articlesContainer.hasChildNodes()) {
        articlesContainer.removeChild(articlesContainer.lastChild);
      }

      var data = JSON.parse(event.target.responseText);

      if ("spotlightContainerSelector" in options) {
        var spotlightContainer = document.querySelector(
          options.spotlightContainerSelector
        );

        if (spotlightContainer) {
          var latestPinned = data.latest_pinned_articles[0];

          if (latestPinned) {
            spotlightContainer.appendChild(
              articleDiv(
                latestPinned,
                options.spotlightTemplateSelector,
                options
              )
            );
          }
        } else {
          console.warn("latest-news: No spotlight container found");
        }
      }

      if (data.latest_articles) {
        data.latest_articles.forEach(function (article) {
          articlesContainer.appendChild(
            articleDiv(article, options.articleTemplateSelector, options)
          );
        });
      }
    } else {
      console.warn("latest-news: No articles container found");
    }
  };
}

function fetchLatestNews(options) {
  var url = "https://ubuntu.com/blog/latest-news";
  var params = [];
  revealSection();

  if (options.limit) {
    params.push("limit=" + options.limit);
  }

  if (options.tagId) {
    params.push("tag-id=" + options.tagId);
  }

  if (options.groupId) {
    params.push("group-id=" + options.groupId);
  }

  if (params.length) {
    url += "?" + params.join("&");
  }

  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", latestArticlesCallback(options));
  oReq.open("GET", url);
  oReq.send();
}

if (typeof window.fetchLatestNews == "undefined") {
  window.fetchLatestNews = fetchLatestNews;
}

export {
  articleDiv,
  fetchLatestNews,
  formatDate,
  getTemplate,
  latestArticlesCallback,
  revealSection,
};
//# sourceMappingURL=index.js.map
