# Blogging

Tools:
* https://jekyllrb.com/
* https://ghost.org/

# Setting up blogging with Github pages

[Github Pages](https://pages.github.com/).

To use own domain (subdomain):
* Include file named `CNAME` with name of your subdomain: `blog.aryzing.net`.
* In GoDaddy, create a CNAME record that points `blog` to `aryzing.github.io`. DNS propagation may take 24h+.

# Jekyll

Jekyll requires [Ruby](https://gorails.com/setup/ubuntu/14.04).

[Jekyll install guide](https://jekyllrb.com/docs/quickstart/).

## Posts

Posts go into `_posts` folder with naming convention `YYYY-MM-DD-post-title.extension`.

Add a **front matter** to markdown posts:

```
---
layout: post
title:  "Setting up your workspace with Ubuntu + Atom"
date:   2016-04-26 21:00:48 -0700
categories: ubuntu atom workspace
---
```

# Pandoc
