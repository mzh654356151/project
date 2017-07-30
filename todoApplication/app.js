
var STORAGE_KEY = 'application-vue.js';
//客户端存储数据
var todoStorage = {
    fetch: function () {
        var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        todos.forEach(function (todo, index, array) {
            todo.id = index;
        })
        todoStorage.uid = todos.length;
        return todos
    },
    save: function (todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
}
var filters = {
    all: function (todos) {
        return todos
    },
    uncompleted: function (todos) {
        return todos.filter(function (item) {
            return !item.completed
        })
    },
    completed: function (todos) {
        return todos.filter(function (item) {
            return item.completed
        })
    }    
}

var application = new Vue({
    el: '.application',
    data: {
        newTodo: '',
        todos: todoStorage.fetch(),
        editedTodo: null,
        visibility: 'all'      
    },
    //了解
    watch: {
        todos: {
            handler: function (todos) {
                todoStorage.save(todos);
            },
            deep: true
        }
    },
    computed: {
        filteredTodos: function () {
            return filters[this.visibility](this.todos)
        },
        remaining: function () {
            return filters.uncompleted(this.todos).length
        },
        allDone: {
          get: function () {
              return this.remaining === 0
          },
          set: function (value) {
              this.todos.forEach(function (item) {
                  item.completed = value;
              })
          }
        }
    },
    methods: {
        addTodo: function () {
            var text = this.newTodo.trim();
            if (!text) {
                return
            }
            this.todos.push({ text: text, completed: false });
            this.newTodo = '';

        },
        // complete: function (todo) {
        //     todo.completed = true;
        // },
        removeTodo: function (todo) {
            this.todos.splice(this.todos.indexOf(todo), 1);
            // this.todos.$remove(todo);

        },
        editTodo: function (todo) {
            this.beforeEditCache = todo.text;
            this.editedTodo = todo;
            console.log(this.editedTodo === todo)
        },
        doneEdit: function (todo) {
            // if (!this.editedTodo) {
            //     return
            // }
            this.editedTodo = null;
            todo.text = todo.text.trim();
            if (!todo.text) {
                this.removeTodo();
            }
        },
        cancelEdit: function (todo) {
            //这是对编辑框进行切换 editedTodo！= todo 则切换到.show div      
            this.editedTodo = null;           
            todo.text = this.beforeEditCache;

            // html中没有传入todo，则这里的todo为事件。
            // console.log(todo)
        },
        removeAllCompleted: function () {
            this.todos = filters['uncompleted'](this.todos);
        }        
    },
    directives: {
        // 'todo-focus': function (value) {
        //     if (!value) {
        //         return
        //     }
        //     var el = this.el;
        //     Vue.nextTick(function () {
        //         el.focus();
        //     });
        // }
        'todo-focus': function (el, binding) {
            if (binding.value) {
                el.focus();
            }
        }
    }

})

// var router = new Router();
// ['all', 'active', 'completed'].forEach(function (visibility) {
//  router.on(visibility, function () {
//      app.visibility = visibility;
//  });
// });
// router.configure({
//  notfound: function () {
//      window.location.hash = '';
//      app.visibility = 'all';
//  }
// });
// router.init();

// handle routing
function onHashChange () {
  var visibility = window.location.hash.replace(/#\/?/, '')
  //如果filters拥有这个visibility属性，那就对application赋值，
  //因为你点击的可能是别的链接
  if (filters[visibility]) {
    application.visibility = visibility;
    // console.log(application.visibility);
  } else {
    window.location.hash = ''
    // application.visibility = 'all'
  }
}

window.addEventListener('hashchange', onHashChange, false);
//线运行一遍onHashChange，如果刚开始没有锚点，就赋值all，有锚点，就跳到锚点
onHashChange()
console.log(window.location.hash);









