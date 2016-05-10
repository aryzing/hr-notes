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

To delete a branch:
```sh
git branch -d branchName
git branch -D branchName
```

From the man pages:
```
-d, --delete
    Delete a branch. The branch must be fully merged in its upstream
    branch, or in HEAD if no upstream was set with --track or
    --set-upstream.

-D
    Delete a branch irrespective of its merged status.
```

# Squashing various commits into one

The following rebase command squashes 3 commits into one. When editor opens (remember `-i` means interactive) change "pick" to "fixup" for all commits except the first.
```
git rebase -i HEAD~3
```

# Change a remote's name:

Command to change remote URL, can be used for switching from https to ssh:

```sh
$ git remote set-url origin git@github.com:aryzing/playground.git
```
