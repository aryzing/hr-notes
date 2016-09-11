# Pandoc

```sh
pandoc file.md -o file.html --from markdown_github --to html
pandoc index.md -o index.html --from markdown_github --to html
```

For the syntax highlighting to work, make sure javascript blocks are tagged as `javascript` and **not** `js`.
