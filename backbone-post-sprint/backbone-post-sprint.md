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

## Model hash properties used to configure instance
When defining a model, properties within the **extend hash** will be `get`/`set` accessible from the instance. Properties of the **constructor hash** will be passed to first argument of `initialize` for instance configuration.

The constructor hash properties are stored within the created instance, under `attributes`. They are accessible via `get`/`set`. The extend hash properties are attached to the instnace's prototype (`__proto__`). Additionally, properties directly assigned to `this` in the extend hash will also be attached to the instance. Finally, special keyword constructor hash properties will be attached directly to the instance.

Generally attached properties should not be modified. They will mask prototype properties with the same name or change the value of a currently attached property without setting off any events.

Not only will constructor hash properties stored in the (`attributes`) object, they will also be made available through the first argument of the `initialize` function.

Example 1:
```js
var ElectricCar = Backbone.Model.extend({ // extend hash
  initialize: function(params) {
    this.theModelName = params.modelName;
    this.totalRange = params.range;
    this.material = params.interior;
  },
  wheels: 4,
  batteries: true,
  seats: 5
});
var order1 = new ElectricCar({ // constructor hash
  modelName:'P85D',
  range: 400,
  interior: 'leather'
});
```
Result 1:
```js
order1.wheels;    // prototype
order1.batteries; // prototype
order1.interior;  // prototype
order1.theModelName;
order1.totalRange;
order1.material;
order1.get('modelName'); // order1.attributes.modelName
order1.get('range');     // order1.attributes.range
order1.get('interior');  // order1.attributes.interior
```

Example 2:
```js
var ElectricCar = Backbone.Model.extend({ // extend hash
  initialize: function(params) {
    this.set({'theModelName': params.modelName});
    this.set({'totalRange': params.range});
    this.set({'material': params.interior});
  },
  wheels: 4,
  batteries: true,
  seats: 5
});
var order1 = new ElectricCar({ // constructor hash
  modelName:'P85D',
  range: 400,
  interior: 'leather'
});
```
Result 2:
```js
order1.wheels;    // prototype
order1.batteries; // prototype
order1.interior;  // prototype
order1.get('theModelName'); // order1.attributes.
order1.get('totalRange');   // order1.attributes.
order1.get('material');     // order1.attributes.
order1.get('wheels');       // order1.attributes.
order1.get('batteries');    // order1.attributes.
order1.get('interior');     // order1.attributes.
```
Example 3:
```js
var ElectricCar = Backbone.Model.extend({ // extend hash
  initialize: function(params) {
  },
  wheels: 4,
  batteries: true,
  seats: 5
});
var order1 = new ElectricCar({ // constructor hash
  modelName:'P85D',
  range: 400,
  interior: 'leather'
});
```
Result 3:
```js
order1.wheels;    // prototype
order1.batteries; // prototype
order1.interior;  // prototype
order1.get('modelName');
order1.get('range');
order1.get('interior');
```
### Visual representation
img1, img2, img3

## Constructor hash properties `model` and `collection`: special treatment
In object passed to constructor bind directly to the instance (only on views?)
### Model example
What if we pass a model reference to a model constructor? Lets see:
```js
var ElectricCar = Backbone.Model.extend({ // extend hash
  initialize: function(params) {
  },
  wheels: 4,
  batteries: true,
  seats: 5
});
var order1 = new ElectricCar({ // constructor hash
  modelName:'P85D',
  range: 400,
  interior: 'leather'
});
var order2 = new ElectricCar({ // constructor hash
  model: order1,
  modelName:'P90',
  range: 415,
  interior: 'carbon fiber'
});

order2.model; // undefined!
```
It does not get any special treatment and is added into `attributes`.

### Collection example
Building on `ElectricCar`:
```js
var Fleet = Backbone.Collection.extend({model: ElectricCar});
var lyft = new Fleet([order1, order2]);
var uber = new Fleet([
  {
    color:'black',
    model: 'prius'
  },
  {
    color: 'dark-gray',
    model: 'VW'
  }
]);
```
Regardless whether the array contains constructed model instances or lean objects, the collection is populated as expected. With `lyft`, the properties within `order1` and `order2`'s `attributes` are transferred to the attributes of the collection objects. In the case of `uber`, it is the object properties themsleves that make their way into the `attributes` of each item in the collection.

A mixed pattern works too:
```js
var uberLyft = new Fleet([
  order1,
  {
    color:'black',
    model: 'prius'
  },
  order2,
  {
    color: 'dark-gray',
    model: 'VW'
  }
]);
```
Note however, that `order1` and `order2` have already been issued a `cid` by backbone, so they represent the **exact same** object whether they are part of `lyft` or `uberLyft`. However, the objects in `uber` are different to the objects of `uberLyft`.

What happens if a collection is created with no `model` property in options hash?
```js
var BunchOfCars = Backbone.Collection.extend();
var lyft = new BunchOfCars([order1, order2]);
var uber = new BunchOfCars([
  {
    color:'black',
    model: 'prius'
  },
  {
    color: 'dark-gray',
    model: 'VW'
  }
]);
```
Upon inspecting each of the items in the collection, those that already had a defined prototype as a result of a previous constructor (`order1` and `order2`), have access to their predefined prototype. In the case of `uber`, its items do not have a Backbone prototype: they default to `Object.prototype`. Therefore, the `model` property in the constructor options hash sets the prototype of the items in its collection.

### Extra params get fed into `initialize`

A collection can be an array of anything.

```js
var numbers = Backbone.Collection.extend({});
```

# Collections are a funnel for events, plus they can themselves emit events
