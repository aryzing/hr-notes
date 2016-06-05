angular.module('app', [])

.controller('MainController', function($scope, Todos) {
  angular.extend($scope, Todos);
})
.factory('Todos', function() {
  var todos = [];
  var addTodo = function(todo) {
    todos.push({title: todo, added: Date.now()});
    newTodo = '';
  };
  var done = function(index) {
    todos.splice(index, 1);
  };

  return {
    todos,
    addTodo,
    done
  };
});
