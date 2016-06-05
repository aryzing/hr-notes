# Angular

Models are POJSOs: *Plain Old JavaScript Objects*.

A module is just a function or an object.

Three ways a module can obtain dependencies:
* Using a constructor.
* Object lookup on global reference.
* Dependency injection: dependency given to module when needed.

**Dependency injection**: Software design pattern in which one or many dependencies are injected (passed by reference) into a dependant module and is made available in the module's state.

Dirty checking: whenever the value of a model used in a template changes, it is considered dirty, and will update the new value in the view.

```js
angular.module(`app`, [/*dependencies*/])
.controller('MainController', function($scope) {
  $scope.name = 'Main';
});
```

**Directives**: Extensions of HTML elements. Core feature of Angular. Extends exisiting HTML elements and allows you to create your own.

```html
<html ng-app> <!-- `ng-app` is a directive'-->
  <head></head>
  <body>
    <input ng-model="stuff" /> <!-- makes text the value of `stuff` model-->
    <h1>{{stuff}}</h1>
    <script src="angular.js"></script>
  </body>
</html>
```

## Sample Todo App

HTML:
```html
<!DOCTYPE html>
<html lang="en" ng-app="app"> <!-- Don't forget `ng-app`!!! -->
<head></head>

<body>
  <!-- create variable, assign value with `ng-init`-->
  <section class="demo" ng-init="todos=[]">
    <input type="text" class="todo-input">
    <button>add</button>
  </section>
  <script src="angular.js"></script>
</body>

</html>
```

Initializing an angular app and attaching a controller:
```html
<html ng-app="app">
<head>
</head>
<body ng-controller="Joystick">
</body>
</html>
```

Pipe syntax:
```js
{{displayMe | json}}
array | filter:search
```

Events:
```html
<button ng-click="addTodo(newTodo);">add</button>
```

Element repetition:
```html
<div ng-repeat="car in parkingLot track by $index" ng-click="retrieve($index)">
  {{$index + 1}}. {{car.plateNumber}}
</div>
```

Conditional appearance:
```html
<div ng-if="!error">You were successful!</div>
<div ng-hide="complete">Complete form before continuing</div>
<div ng-show="distance > 5">Congrats! Great workout!</div>
```

# Factories and Services
Can **not** use `$scope` in factory

Extending scope with factory's properties:
```js
.controller('MainController', function($scope, Todos) {
  angular.extend($scope, Todos);
})
```

Requesting data over http:
```js
.factory('Reddit', function($http) {
  var getData = function() {
    return $http({
      method: 'GET',
      url: 'http://www.reddit.com/json'
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  return {getData};
});

.controller('Name', function($scope, Reddit) {
  $scope.getReddit = function() {
    Reddit.getData()
      .then(function(data) {
        $scope.reddit = data;
      });
  };
});
```
