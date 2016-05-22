# Backbone

Create a new constructor using backbone

```js
var Tweet = Backbone.Model.extend({/* object */});
```

Use your new constructor that now has Backbone built-in goodness. Always pseudoclassical.

```js
var myTweet = new Tweet();
```

There seems to be some sort of object (or hashtable) that stores values. The stored values should only be manipulated through backbone functions, including `get`, `set`.

```js
myTweet.set({'key': 'value'}); // this syntax ...
myTweet.set('key', 'value'); // ... equivalent to this
myTweet.get('key');
```

These methods must be used so that the event listeners work properly. The callback function is passed in an object describing the event. The specific values changed can be seen by inspecting the event object

```js
myTweet.on('change', function callback(e) {
  console.log(e.changed);
});
```

The object passed into `extend` will help define our model. Method `initialize` within the object has special significance in Backbone. It will run every time a `new` instance of the model is created.

```js
var Message = Backbone.Model.extend({
  initialize: function() {}
});

var myMsg = new Message(); // the 'initialize' method is executed
```

Initialization functions are useful, for example, to set event listeners on all instances of our model:

```js
var SpineConstructor = Backbone.Model.extend({
  initialize: function() {
    this.on('eventName1', function callback() {});
    this.on('eventName2', function callback() {});
  }
});
```

Note that `this` within functions in configuration objects gets bound to an instance of the model.

The argument to `initialize` is the argument that is passed to the constructor using pseudo:

```js
var Something = Backbone.Model.extend({
  initialize: function(formalArg) {       // `formalArg` "points to" ...
    // code that uses `formalArg`
  }
});

var mySomething = new Something(actualArg); // ... this `actualArg
```

When adding event listeners, we can add them for an occurance of that event anywhere on the current object, or for a specific property:

```js
instance.on('change', function() {}); // will run for any changes on instance

instance.on('change:prop', function() {}); // only for changes to `prop` attribute
```

For a given idea-object, you create a model. Then you create a view. The view can generically access "areas" of the model via `this`. The view is defined without being tied any model.

Sidenote on views: there is a jQuery like "bucket" where all html for that particular view is supposed to be dumped into: `$el`. It can be accessed from most places via `this.$el` during definition and ... ? ... from the instance. Convention for the view to have a `render` function which populates and returns the updated `$el` node.

```js
{
  render: function render() {
    // do rendering operations
    return this.$el;
  }
}
```

Moving on, after having a view constructor and a **model instance**, a view instance linked to the model may be created passing an object to the view constructor:

```js
var thatGuy = new ModelCitizen();
var vew = new AmazingView({model: thatGuy});
```

Hmmm. Since the argument passed to the view constructor is being used to link a view instance to a model instance. I am tempted to say that, unlike model's `initialize` function, the view initialize function does not use the argument passed to the instance constructor. The object passed to the view constructor is called an **options hash**.

So, what happens when we've got too many collections to handle? Group'em. Backbone supports collections:

```js
var Comments = Backbone.Collection.extend({
  model: Comment
});
```

OK, so hold on a sec. the collection gets passed as an argument the "**constructor instance**" its keeping track of. That is, the function (object) that is used as a constructor for instances of models.

Moreover, the collections can also have views linked to them. Lets do this: a view for a collection:

```js
var CommentsView = Backbone.View.extend({
  initialize: function init() {
    this.model.on('change:votes', this.render, this);
  }
});
// except for `Comments` text, exact same code
```

This works because events **buble up** from any model into its collection. Good to know

As far as designing a view for a collection, know that within the view definition, the `this.model` will actually point to **all** model instances. Therefore, `underscore` functions that deal with groups can be used as methods:

```js
this.model.map();
this.model.reduce();
```

Note however, that despite the view referencing multiple models from the model property, the view itself continues to render a single view. That is, the view does not instruct each model to create a view for themselves or something like that. The view for the collection of models is a signle entity.

Two additional details:
* event setting event listeners on `model` from a view destined to be used on a collection bind the listener to all models in the collection.
* the `underscore` functions get passed in as their element each on of the model instances.

Finally, the view which we intend to be used on a collection must be linked to the collection. This is done by creating an array of the models, and passing the variable that refers to this array into the collection, and then passing the collection as an argument to the view. Few!

1. Create array and populate with module instances
2. Pass that array to collection constructor
3. Pass collection instance to view constructor.

```js
// step 1
var modList = [new Mod(1), new Mod(2), new Mod(3)];

// step 2
var col = new ModCol(modList);

// step 3
var viewOfCol = new ViewAlmighty({model: col});
```

<!-- AFTER SPRINT -->

# What I learned after the sprint
## The three extensions
```js
var myMod = Backbone.Module.extend();
var myCol = Backbone.Collection.extend();
var myViw = Backbone.View.extend();
```

## Collection can be array of anything
* Data with no model
* Data with model
* Instances with no model
* Instances with model
### Collection with empty extended object
Items for array:
```js
var house1 = {
  number: 1001,
  floors: 3,
  color: 'white'
};
var house2 = {
  number: 20,
  floors: 1,
  color: 'brown',
  elevator: true
}
var house3 = {
  number: 4141,
  floors: 35,
  color: 'blue',
  description: 'skyscraper'
}
```
Construction of array:
```js
var houses = [house1, house2, house3];
```
Defining collection constructor
```js
var Buildings = Backbone.Collection.extend();
var companySites = new Buildings(houses);
```
Points to note:
* The collection `companySites` holds the data of the houses.
* Not all houses have the exact same properties.
* The data stored in the collection was written by the programmer.
### Collection with model extended object
Defining model constructor and a few instances:
```js
var Bottle = Backbone.Model.extend();
var bot1 = new Bottle();
var bot2 = new Bottle();
var bot3 = new Bottle();
var containers = [bot1, bot2, bot3];
```
Creating a collection with a defined model type:
```js
var Bottles = Backbone.Collection.extend({model: Bottle});
var bottles = new Bottles(containers);

```
If the array elemens are models, declaring the type of model in the collection argument hash allows

## Model hash properties get added to instance
When defining a model, properties within he `extend` hash will be `.` accessible from the instance. Properties passed in to the constructor will be accessible via getters and setters.
```js
var ElectricCar = Backbone.Model.extend({
  wheels: 4,
  batteries: true,
  seats: 5
});
var order1 = new ElectricCar({
  modelName:'P85D',
  range: 400,
  interior: 'leather'
})
```
Accessing `wheels`, `batteris`, and `seats`:
```js
order1.wheels;    // 4
order1.batteries; // true
order1.seats;     // 5
```
Accessing `modelName`, `range`, `interior`, and `rims`:
```js
order1.get('modelName'); // 'P85D'
order1.get('range');     // 400
order1.get('interior');  // 'leather'
```

### Properties enclosed in object under attributes
### Should be accessed read/write with get/set
### Passing a hash with model to a model constructor?

## All instances share properties and methods defined in constructor, can be accessed directly with dot notation. Those passed in as hash, with get and set.

## Keywords `model` and `collection` in object passed to constructor bind directly to the instance
### Model example
### Collection example
### Extra params get fed into `initialize`




A collection can be an array of anything.

```js
var numbers = Backbone.Collection.extend({});
```

# YouTube video
[Playlist](https://www.youtube.com/watch?v=4t0n5k0X7ow&index=1&list=PLTjRvDozrdlwn9IsHWEs9IQv3HQob4bH3).

To initialize a model constructor, we extend the backbone model. The initialize function will run whenever a model is instantiated.
```js
var Song = Backbone.Model.extend({
  initialize: function() {
    console.log("A song has been created.");
  }
});

var song = new Song();
```

## Working with attributes
Attribute methods:
```js
song.set('title', 'Blue in Green');

var title = song.get('title');

var hasTitle = song.has('title');

song.unset('title');

song.clear();
```
Attributes can be set in bulk by passing an object to `set` or to the constructor.

We can specify our model to have default attributes:
```js
var Song = Backbone.Model.extend({
  defaults: {
    gengre: 'Jazz'
  }
});
```

## Validation
The validate function is run every time properties are set on object. By convention, must return string error message, or nothing (undefined) if there are no errors. The input to the validation function is the instance's attributes.
```js
var Song = Backbone.Model.extend({
  validate: function(attrs) {
    if (!attrs.title) {
      return "Title is required";
    }
  }
});

song.isValid(); // true or false
song.validationError; // Error string returned by validate
```

## Inheritance

```js
var Animal = Backbone.Model.extend({
  walk: function() {
    console.log('Animal walking...');
  }
});

var Dog = Animal.extend({
  walk: function() {
    Animal.prototype.walk.apply(this);
    console.log('Dog walking');
  }
});

var dog = new Dog();
dog.walk();
```

# Important note on inserting regular objects into a collection
[StackOverflow post](http://stackoverflow.com/questions/16368455/backbone-js-and-non-model-objects).

Objects doesn't have to be models just because you are using Backbone.

The Backbone Model object is basically just a wrapper around a regular object, that has methods for accessing the data, and events that you can use to subscribe to changes.

If you want to put the objects in a Backbone Collection, then they will be wrapped in models if they aren't already.

# Udemy course on Backbone
[link](https://www.udemy.com/backbonejs-tutorial/?couponCode=utube).

**Models**: Containers for application data. They have **change tracking mechanism** and **publish events** when their state changes. Can also do ajax.

[Modernizr](https://modernizr.com/) tests user browser's capabilities.

Backbone script dependencies: jquery > underscore > backbone. Before closing body tag.

```js
// supplied object determines the configuration of the model
var Song = Backbone.Model.extend({
  // initialize method called by when creating instance of `Song`
  initialize: function() {
    console.log('A new song has been created.');
  }
})

var song = new Song();
```

Backbone models store attributes in a hash, and can not be referenced directly like regular JS objects.

```js
song.set('title', 'Blue in Green'); // single attribute
song.set({ // multiple attributes
  artist: 'Miles Davis',
  publishYear: 1959
});

// Alternatively
var song = new Song({
  title: 'Blue in Green',
  artist: 'Miles Davis',
  year: 1959
});
```

If a JSON representation of model is necessary, use
```js
var obj = song.toJSON();
```

Attribute operations:
```js
song.set('key', 'val');
song.get('key');
song.unset('key'); // removes attribute
song.clear(); // removes all attributes
song.has('key'); // boolean has attribute key?
```

To set default attributes on models, use `defaults` property when extending model:

```js
var Song = Backbone.Model.extend({
  defaults: {
    genre: 'Jazz'
  }
});
```

## Validation

Validation function on model extension receives model attributes. Function should **return string on error detection**.
```js
var Song = Backbone.Model.extend({
  validate: function(attrs) {
    if (!attrs.title) {
      return "Title is required";
    }
  }
})

var song = new Song();

song.isValid() // false
song.validationError // Title is required
```

## Inheritance

Properties defined when extending `Model` will be in prototype of instances.

Properties defined when creating instances will be attributes of those models.

Inheritance is achieved by extending models
```js
var Animal = Backbone.Model.extend({
  walk: function() {
    console.log("Animal walking...");
  }
});

var Dog = Animal.extend({
  walk: function() {
    Animal.prototype.walk();
    console.log("Animal is a dog");
  }
});

var dog = new Dog();

dog.walk(); // animal walking
```

**Note** If the `walk` method on `Animal` operated on `this`, then `Dog`'s `walk` would need to `apply(this)`.

## Connecting to the Server

Three operations to sync with server:
```js
fetch() // GET
save() // POST / PUT
destroy() // DELETE
```

Backbone relies on the `urlRoot` property to know a model's endpoint:
```js
var Song = Backbone.Model.extend({
  urlRoot: '/api/songs'
});
```

Example: retrieving a song from server
```js
var song = new Song({id: 1});
song.fetch();
// GET /api/songs/1
```
Will issue a `GET` request because only setting and `id` is not considered modyfing an object. So it will consult the server for the rest of the properties of this instance.

Example: saving a modified model
```js
var song = new Song({id: 1});
song.fetch();

song.set('title', 'New Title');
song.save();
// PUT /api/songs/1
```

Example: creating a new model
```js
var song = new Song();
song.set('title', 'Title');
song.save();
// POST /api/songs
```

Example: deleting a model
```js
var song = new Song({id: 1});
song.destroy();
// DELETE /api/songs/1
```

The attribute that uniquely identifies models is `id` by default, but can be changed with:
```js
var Song = Backbone.Model.extend({
  idAttribute: "songId"
});

var song = new Song({songId: 1});
```

These methods are async and accept two callbacks:
```js
var song = new Song();

song.fetch({
  success: function() {/*...*/},
  error: function() {/*...*/}
});
```

Note that `save` takes two arguments:
```js
var song = new Song();

song.save({/* attributes */}, {
  success: function() {/*...*/},
  error: function() {/*...*/}
});
```

# Collections

## Creating Collections

Extend `Collection` and specify the type of model it can hold:
```js
var Song = Backbone.Model.extend();
var Songs = Backbone.Collection.extend({
  model: Song
});
```

Can add models to a collection at instantiation or with `add`:
```js
var songs = new Songs([
  new Song({title: 'title1'}),
  new Song({title: 'title2'}),
  new Song({title: 'title3'})
]);

songs.add(Song({title: 'title4'}));
```

Note: `add` is an underscore function.

The collections object has a `length` property and a `models` property.

Elements in a collection can be referenced with `at()`: returns the model *at* argument position.

All models have two ids: `cid`, client id, and the primary or persistant `id`.

Specific models can be retrieved from a collection with either id:
```js
songs.get('c1');
```

Models may be removed with `remove`. Expects model as argument:
```js
songs.remove(songs.at(0));
```



# Todo tutorial
http://backbonejs.org/docs/todos.html
