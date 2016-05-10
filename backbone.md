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
