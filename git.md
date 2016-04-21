

# Git

Setting global variable `push.default` to `simple` makes enables pushing to the target remote branch with same name as active local branch. [Article](http://stackoverflow.com/questions/13148066/warning-push-default-is-unset-its-implicit-value-is-changing-in-git-2-0).

```sh
git config --global push.default simple
```

or insert the following in `.gitconfig`
```
[push]
	default = simple
```
