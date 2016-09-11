# Bash intro

Bash stands for Bourne Again SHell. It is a command line interpreter.

The first thing we can do is get the version of bash we're using with

```sh
echo $BASH_VERSION
# example output:
# 4.3.46(1)-release
```

# Commands

* `pwd` prints the current working directory. Tells you where you are. This directory is where commands get executed.

```sh
pwd
# example output:
# /home/aryzing/workspace
```

* `ls` lists directory contents. May give it a folder in current directory or any directory path to list those contents instead.

  * `-l` flag lists the details of files
  * `-a` list all files. Do not ignore entries starting with `.`.
  * `-A` list almost all files. Do not list implied `.` and `..`.
  * `-1` list one file per line.

```sh
ls
ls -l
ls -Al /abs/path/to/dir
ls -a ./rel/path/to/dir
```

* `man` bring up manual for command. Usage: `man <command>`.

```sh
man ls
man pwd
```

  * Man pages are displayed with a viewer program called `less`. Press `h` to view all options.

* `mkdir` create directory.

* `rmdir` remove **empty** directory.

* `cp` copy file

* `rm` remove file
```sh
mkdir docs
rmdir docs #must be empty to be removed
cp from ./to/somewhere
rm bye.txt
```

* `cat` concatenate files and print on the standard output.

* `more` view file one page at a time (space to advance).

* `less` like more but with more functionality.

* `head` display first few lines of a file.

* `tail` display last few lines of file.

* `wc` print newline, word, and byte counts for each file.

# Tilde and Brace Expansion

There are variables available called `$HOME`, `$PWD`, and `$OLDPWD` (previous dir we were in).
`pwd` prints value of `$PWD`.
`~` expands to value of `$HOME`, `~+` expands to $PWD, and `~-` expands to $OLDPWD.
This is called tilde expansion.

Brace expansion expands comma separated values or ranges onto previous arguments.

```sh
touch {a,b,c} #creates files a, b, and c.
# equivalent to touch a, touch b, touch c.

touch {a,b}c #creates files ac and bc
```

Note that `touch {a,b}{c}` creates files `a{c}` and `b{c}` (brace is part of file  name).
There must be a comma or else braces get interpreted literally.

Questions:
* Result of `touch {a,b}{c}`?
* Result of `touch {a,b}{c,}`?
* Result of `touch {a,b}c`?

**Comment to self**: commands are just text strings interpreted by bash. Certain characters have special meaning. For example, braces cause their contents to be expanded into the command string itself separated by spaces. 

So ther isn't much point to doing something like `touch {fileA,fileB,fileC}` because it expands to `touch fileA fileB fileC`. It can be said that `touch a b c` is the **resulting command string** of `touch {a,b,c}`. 

Note that the expansion is attached to the surrounding characters:

```sh
echo start_{b,c}_end
# start_b_end start_c_end

echo start_{b,c}{d,e}_end
# start_bd_end start_be_end start_cd_end start_ce_end
```

Braces can also process ranges, including steps.

```sh
echo {1..7} 
#1 2 3 4 5 6 7 

echo {01..100} 
#numbers 1 through 100 with leading zeros.
#001 002 003 [...] 063 064 [...] 100

echo {a..z} #letters of alphabet (in ascii order)
echo {W..e}
#W X Y Z [  ] ^ _ ` a b c d e

echo {1..10..2} #1 3 5 7 9
echo {w..d..3} #w t q n k h e
```

# Pipes and redirection

Piping refers to taking the output of one command and feeding it as input to another. This is signaled with the pipe `|` character.

We can also redirect output to a specific location. Standard output and error can be redirected with `1>` and `2>`, and both simultaneously with `&>`.

Note that a pipe is used to pass output to another **program or utility**, whereas redirection is used to pass output to either a **file or stream**.

You may redirect to `/dev/null` if you want to throw away output.

```sh
cp -v * ../otherfolder 1> ../success.txt 2> ../error.txt
#-v makes cp verbose
#all standard output will be written to file success.txt
#all standard error will be written to file error.txt
```

#Manipulation

* `grep` print lines matching a pattern. `grep file search_string`.

There are two ways of enabling color: with `--color=auto` and by exporting `GREP_OPTIONS='--color=auto'`. So this leads us to think that when a program executes, must have both access to the arguments used in its invocation, as well as some kind of global or environment variable access.

Also, this leads us to understand that there is a certain order in which the command string is processed (precedence?). For example, before passing in the arguments to the program, it must understand actions that are to take place, such as output piping or redirection, and expansion.

So, what does the environment and the arguments of a program invoked through piping look like? I imagine that the called program only sees the arguments in its particular segment of the pipe.

```sh
grep --color=auto file.txt searchstring
export GREP_OPTIONS='--color=auto'
```

* The `-i` flag makes the search case insensitive.

* Two other interesting string manipulatin programs are `sed` and `awk`.

Example of string manipulation:

```sh
ping -c 1 example.com | grep 'bytes from' | cut -d = -f 4
#ping count 1 time example.com
#grep search line containing 'bytes from'
#cut line up by the delimiter `=` and return field number four
```

# Scripts

* An **interpreter directive** or hashbang or shebang is a line stating which program should run the script
* For bash scripts,

```sh
#!/bin/bash
# comment
```

* A script may be executed by bash by using a script's path as an argument to `bash`, i.e. `bash my.sh`. 
* If the script has a shebang line and it is marked as executable, there is no need to give a program name to execute the script.
* For a script to be executed, it's directory must be in `$PATH`.
* Directory `/usr/bin` is always in `$PATH`.

# Echo

* `echo` returns the statement it was given.
* quotes play an important role on how commands are interpreted
* no quotes: some characters hold special meaning. Escape with `\`.
* single quotes or strong quotes: nothing is interpreted.
* double quotes: some things are interpreted.

```sh
greeting=hello

echo $greeting, world \(planet\)!
# hello, world (planet)

echo '$greeting, world \(planet\)!'
# $greeting, world \(planet\)!

echo "$greeting, world \(planet\)!"
# hello, world (planet)
```

So this part of the video tutorial was more of an excuse to learn about the different ways that statements get processed and how quotes affect them.

Also, I have discovered that the space can be kind of a command delimiter. For example, if a previous group of characters are considered to be finished, then a space character will give way to a new command. For example, compare 

```sh
echo hi ls
# hi ls

a=hi ls
# assigns hi to a and then lists pwd
```

Since echo is an infinite argument command, everything after it separated by spaces are considered arguments. 

Space is indeed a special separator character. Consider

```sh
echo hi ls b
# hi ls b

echo hi       ls   b
# hi ls b
```

The spaces serve to separate arguments.

```sh
echo "hi   ls   b"
# hi ls b
```

So the space is the delimiter character between arguments. Actual spaces must be escaped `\ ` or placed between double quotes such as `echo "a    b  c"`.


Double quotes, it seems, keeps all characters as they are typed, except for variable names, which are substituted.

Adding attributes to variables:

```sh
declare -i d=123    # d is an integer
declare -r e=456    # e is read only
declare -l f=Hello  # f is hello
declare -u g=World  # g is WORLD
```

Built-in variables: `$Home`, `$PWD`, `$MACHTYPE`, `$HOSTNAME`, `$BASH_VERSION`, `$SECONDS`

Seconds counts the time the shell session has been active or the time a script has been running when used in scripts.

Variable $0 contains a path to the running script.

# Command substitution

Wrapping a command in `$()` executes it and evaluates to its result.

# Arithmetic operations

We indicate that we want to perform an arithmetic operation with double parens: `(( expression ))`.

To assign the result to a variable, must add dollar sign in front: `a=$(( expression ))`.

Within the double parens, variables may be typed without preceding `$`.

Bash math only works with integers.

# Comparison

Comparisons are done within `[[ expression ]]`. It's important to have a space between the expression and the surrounding brackets.

The result of the expression is available in the variable `$?`. Truth or success returns 0, while failure or false returns 1.

Comparisons using mathematical operators (==, <, >, etc) treat arguments as strings. To treat arguments as numbers, use `-lt`, `-gt`, `-le`, `-ge`, `-eq`, `-ne`.

Logic operators: `&&`, `||`, and `!`.

To test for null string, use `-z` (is null?) or `-n` (is not null?).











# Useful links

[Chet Ramey's BASH website][1].

[Commands from manual][2].

[Tilde expansion][3].

[Pipes vs Redirection][4].

[Redirection example][5].

[Bash internal variables][6].

[1][http://tiswww.case.edu/php/chet/bash/bashtop.html]
[2][http://tiswww.case.edu/php/chet/bash/bashref.html#SEC137]
[3][https://www.gnu.org/software/bash/manual/html_node/Tilde-Expansion.html]
[4][http://askubuntu.com/questions/172982/what-is-the-difference-between-redirection-and-pipe]
[5][http://stackoverflow.com/questions/2342826/how-to-pipe-stderr-and-not-stdout]
[6][http://tldp.org/LDP/abs/html/internalvariables.html]
