# Mocha and Chai

```sh
$ npm install mocha
$ npm install chai
```

**Note**: tests are run with the `mocha` command, not `node`.
```sh
$ mocha spec.js # ok!
$ node spec.js  # error!
```

Tests sections are created with a `describe` function.

```js
describe("Name of this section", function() {
  // test section
});
```

The describe function can be nested to create "sections" of tests:

```js
describe("Name of this section", function() {
  // test section

  describe("Name of this subsection", function() {
    // test subsection
  });

  describe("Name of this subsection", function() {
    // test subsection
  });
});
```

The tests themselves can only be inserted in an `it` function.

```js
describe("Name of this section", function() {
  it("Name of this test", function() {
    // tests in here
  });
});
```

To use Chai syntax, `require` the target module:

```js
var expect = require("chai").expect;
var myModule = require('./my-mod.js');

describe('Name of section', function() {
  it('Name of this test', function() {
    var result1 = myModule.method1();
    var result2 = myModule.method2();
    var result3 = myModule.method3();

    expect(result1).to.equal('this very string');
    expect(result2).to.equal('some other result');
    expect(result3).to.equal('a final value');
  });
});
```
