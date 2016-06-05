# Google Python

# Introduction

Use version 2.4 and later, avoid version 3.

Can set executable bit on `.py` files:
```sh
chmod +x hello.py
./hello.py
```

Boilerplate code for module:
```python
if __name__ == '__main__':
  main()
```

CLI arguments available with
```python
import sys
sys.argv[0] # the script itself
len(sys.argv) # a way of getting argc
```

Function `len()` will return the length of
* Strings
* Lists
* Tuples
* Dictionaries

## Strings
Strings belong to class `str`.

Operators `+` and `*` are overloaded:
```py
'Hello ' + 'World!' # == 'Hello World!'
'Hi' + '!' * 5 # == 'Hi!!!!!'  
```

Accessing out of bounds character with `[]` will raise and error. Program will halt.
## Functions

Functions declare with `def`:
```python
def repeat(s, exclaim):
  result = s + s + s
  if exclaim:
    result = result + '!!!'
  return result
```

## Modules
Each python file is considered a module and has its own namespace. When importing another module, functions and variables are available under that modules name:
```py
import mod
mod.fn();
mod.var;
```

## Help and docs
* [Python docs](docs.python.org)
* Use `help()` and `dir()`: help pulls from documentation string and dir lists attributes of objects.

# Strings
Built-in string class `str`.

String literal can span multiple lines using `\` at end of each line.

String literals inside triple quotes can span multiple lines.

Strings are *imutable*.

Access individual characters with `[]`: `'Hi'[0] == 'H'`

Strings support slice syntax `[:]`.

Length of a string: `len(s)`.

Can not use `+` on mixed types, must convert to string first: `str(2) + ' days left'`.

Strings can be prefixed:
* `r'Hi\nHow are you'` Raw string. Does not treat backslashes
* `u'string` Unicode string

To print a string, use `print` operator.

Useful string methods:
* `s.lower()`, `s.upper()`
* `s.strip()`
* `s.isalpha()`, `s.isdigit()`, `s.isspace()`
* `s.startswith('other')`, `s.endswith('other')`
* `s.find('other')`. Returns index
* `s.split('delim')`. Returns list of substrings separated by delimiter.
* `s.join(list)`. Returns string. All list items joined by `s`.

String formatting with `%`:
```py
text = '%d days %s' % (4, 'to go')
```

# Control flow
Achieved with `if`, `elif`, and `else`.
* Boolean expression need not be enclosed in paranthesis.
* Colon, `:`,  used to mark en of conditional expression.
* Falsey values: `False`, `None`, `0`, empy string, empty list, empty dictionary.
* `==` overloaded to work as expected with strings.
* Boolean operators are spelled out: `and`, `or`, `not`.
# Numbers
There is no ++ operator.

# Lists
List literals written within square brackets:
```py
colors = ['red', 'blue', 'green']
```

Assignment of list does not make a new copy

Operator `+` overloaded to concatenate lists:
```py
up_to_five = [1, 2, 3] + [4, 5]
```

## For in loop
```py
seconds = [5, 4, 3, 2, 1]
for num in seconds:
  print str(num) + ' seconds left to liftoff'
```

To loop an arbitrary number of times, use `range()` to create a list of the specified size:
```py
a = range(10) # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
b = range(2, 5) # [2, 3, 4]
```

## In construct
Just using `in` returns boolean whether a collection contains a vale.

## While Loop
All loops support `break` and `continue`.

While loop give total control over iteration condition:
```py
i = 0
while i < len(a)
  print a[i]
  i = i + 3
```

## List methods
* `list.append(elem)`
* `list.insert(index, elem)`
* `list.extend(list2)` Same as `+` or `+=`.
* `list.index(elem)` Returns index of elem if found, raises ValueError if not found.
* `list.remove(elem)` Removes first instance of elem from list, raises ValueError if not found.
* `list.sort()` Sorts in place. Better use built-in `sorted()` function.
* `list.reverse()` Reverses in place.
* `list.pop(index)` Removes and returns element at given index.

# Sorting

The de-facto sorting function: `sorted()`. Returns a new list with the elements sorted.

It can sort any iterable collection.

Optional arguments include:
* `reverse`: Will sort in reverse order with `reverse=true`.
* `key`: Single argument function for mapping to-be-sorted items to a single value. Uses these values to sort.
* `cmp`: Two argument comparison function.

## Tuples

A tuple is a fixed size grouping of elements. Immutable.

A tuple literal is declared with parens:
```py
tuple = (1, 2, 'bread')
tup   = ('single',)
```

Single element tuples must contain a trailing slash.

The "pointers" are immutable, but what each pointer points to could change (i.e. if it is an object).

Reading and operating values works as expected: `[]`, `[:]`, `len()`.

Assigning a value to a tuple member raises an error.

Tuple of variables assignment:
```py
(x, y, z) = (42, True, 'yes') # x=42, y=True, z='yes'
```

If the sizes don't match, raises error.

# Dictionary

Dictionary aka hash table.
```py
dict = {key1: val1, key2: val2, keyN, valN}
dict_empty = {}
```

Keys can be strings, numbers, and tuples. Any type allowed for value.

Error if referencing a non-existant key. Alternatives: use `in` to verify first or `dict.get(key)` which returns None of it does not exist.

Example:
```py
dict = {}
dict['a'] = 'alpha'
dict['g'] = 'gamma'
dict['o'] = 'omega'

print dict # {'a': 'alpha', 'g': 'gamma', 'o': 'omega'}

'a' in dict # True
# print dict['z'] will produce error

print dict.get('z') # None
```

# String reversal, Map, Filter, Lambda
Reversing string ([post](http://stackoverflow.com/questions/931092/reverse-a-string-in-python)):
```py
>>> 'hello world'[::-1]
'dlrow olleh'
```

Map, Filter, Lambda [explanation](http://www.u.arizona.edu/~erdmann/mse350/topics/list_comprehensions.html).
