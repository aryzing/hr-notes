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

# Tracking remote branches
[link1](http://stackoverflow.com/questions/17096311/why-do-i-need-to-explicitly-push-a-new-branch).

[link2](http://stackoverflow.com/questions/3046436/how-do-you-stop-tracking-a-remote-branch-in-git/3046478#3046478).

# Scott Chacon talk
* [Progit](http://progit.org).

Common operations:
* log
* diff
* inspecting database

Local tests:
* Can clone repo with `file://url`
* Can then add that cloned repo as remote

Git
Git add: I want to add the contents of this file to my next commit.

Git add does not add files, it adds contents of files to the next commit. If file is changed, run git add again so that those new contents are the ones added on the next commit.

Checksums contents and creates key:value pairs in database, where key is sha and value is the contents.

Git commit then creates a new document, a manifest, called a **tree object** with the keys (shas) of all added contents together with their filenames (paths), checksums that, stores it in the same database. That key is then stored in another document, the commit document, that contains your name, time, commit message, previous commit, and other information, checksums the commit, and then returns the key (sha1) to the commit contents.

Keys (sha hashes) created by commit:
* One per document content added
* One for the tree object
* One for the commit itself

All these keys are stored side by side in the same db, and the contents of any can be retrieved by queriying the DB.

Note about tree objects: Each of their lines points to a key for file contents, or another tree object (a new directory). When restoring, it will go through the tree objects. If you have two identical directories with different names, the parent tree object will have two lines with the same sha key but different names, one for each directory.

There is probably a third argument in the tree object that specifies if the contents retreived from a specific key are a file or another tree object.

## Demo time

```sh
git diff # diffs current contents with last commit on same branch
```
When diffing, `a` corresponds to previous commit and `b` the current (uncommited) state of the file.

Merging: How does git know what is the result of a merge? Contents of files will always have a common ancestor, so it compares hunks of modified lines, and uses the modified hunks in the resulting merge. If hunks overlap, that is when a merge conflict occurs.

Modified hunks take precedence over unmodified hunks. The result of an automatic merge is the result of inserting all (non overlapping) modified hunks.

`git merge` merges contents of target branch into currently checked out branch.

* Deleted files? check

Example: "re-integration merges". If the hunks that are modified on the branch being brought in are untouched on the currently checked out branch, they take precedence and rewrite those on current branch.

## The .git directory
When you run `git init`, a `.git` folder is created. That folder *is* the database. All the work is in that folder. If that folder is `tar`ed sent to someone else, they can immediately start working on the repo.

Recap on naming convention:
* **blob**: Is a file file, also called blob object, stores a snapshot of some file's content. The term blob may refer to either the file that stores snapshotted content or the content itself.

* **tree**: A tree file, also called a tree object...
* **commit**: A commit file (also called object)

This object can be accessed with git commands by providing its key, which is its hash. On disk, its is just a zipped file that can be read by unzipping it's contents (zlib compressed data).

Interesting way to create a branch on a random commit: `echo` the commit sha into a file with the desired branch name under `.git/refs/heads`
```sh
# real sha will have 40 chars
echo "3f1a" > .git/refs/heads/new-branch
```

`git commit` does not look at your working directory, it only looks as the staged contents. Possible to run `git add` on all files in working directory, then delete them all (except .git), and commit, and the commit process will work.

Add a patch `git add -p`

When fetching, takes every other object that is not currently in the database and just puts them all in the same namespace. There won't be collisions b/c of shas.

Fetch by default will pull all branches on server.

Repository database objects
objects > index > working directory

Modify working directory >add> new modified index >commit> stores current content of index back into database.

<!-- TODO: Inspect contents of a merged commit -->

The way a merge conflict is resolved, is by adding the resulting contents and committing them. Use git add for marking a conflict as resolved.

`git mergetool` is a thing. Opens preconfigured merge tool.

When merging, it looks for best merge base: closest common ancestor.

`git branch -D` removes branch (pointer), even if it has not been merged. Objects of that branch will remain in DB.

Remotes: Here are urls of any kind that are related to this project.

Understanding triangle like graph topology on github when PR is accepted:
* Use `git merge --no-ff topic`. Will ensure topic branch is brought in with a merge commit. Prevents fast-forwarding.
* [stackoverflow](http://stackoverflow.com/questions/9069061/what-is-the-difference-between-git-merge-and-git-merge-no-ff)
* [Blog](http://nvie.com/posts/a-successful-git-branching-model/)

# Discovering git in group workflow

* How git decides how to merge and why conflicts emerge

* Graph topology: maintaining triangles with `--no-ff`.

* Understanding that merging produces same result regardles of current branch from where merge occurs.

* Don't get fooled by drawings: C3PO is the same

* Will need to go through merge conflicts again. Will take all non-merging patches and reapply them. No point in solving merge conflicts then when tracking progress from remote branch.

* Continuously checkout from commit which is now in the past. If you check current one out, => frowned upon duplicate commits.

* Terminal will always say "up to date with upstream" in this scenario, regardless of having just submitted a PR which has been merged.

* ALL branches working on same hunk will produce merge conflicts.

* Only find out about the conflict after pushing to your fork and and seeing the PR getting denied

* Must then rebase upstream, and force push to your repo => git will not auto-update PR.

* No point in cloning. All objects get pulled down with fetch. Only necessary to `cob` on upstream/master and work away. Push to your repo and PR.

# Hard Reset
[Post](http://stackoverflow.com/questions/9210446/replace-local-branch-with-remote-branch-entirely).
