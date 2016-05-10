# Atom shortcuts
Command Palette: `ctrl+shift+p`

Line manipulation:
* `ctrl+enter` open new line below current
* `ctrl+shift+enter` open new line above current
* `ctrl+shift+k` delete current line
* `ctrl+shift+d` duplicate line

# Package git-plus

**NOT WORKING!**
To open git-plus command palette:
* `ctrl-shift-g` opens git-plus command palette.

To be able to `git push` make sure origin is set up with `ssh`.

Default key binding interferes with live HTML preview. Reassigned git-plus to `ctrl-shift-g`. Interferes with style guide, so reassigned it too: `ctrl-shift-u`.

New key bindings in `~/.atom/keymap.cson`:

```
'.platform-win32, .platform-linux':
  'ctrl-shift-G': 'git-plus:menu'

'.platform-win32, .platform-linux':
  'ctrl-shift-U': 'styleguide:show'
```


# Package live HTML view
* `ctrl+shift+h` open live HTML preview


# Package Floobits

To **create** workspace: from Command Palette, `Floobits: Create Workspace`.

Special to **Hack Reactor**:
* Choose owner to be *HackReactor*.
* Add your name to end of project name, `*-edu[-partner]`.
* Make it editable.

To **join** workspace: `Floobits: Join Workspace` also `ctrl-shift-j`.

Special to **Hack Reactor**:
* Fork repo, but don't clone.

# Package Script

Run code with `ctrl-shift-b`.
