


module.exports = function (app) {
  //d   `1ata sources
  var ds = app.dataSources['db'];

  const createRoles = (cb) => {
    cb(null, [])
  }

  const createUsers = (roles, cb) => {
    ds.automigrate('User', function (err) {
      if (err) return cb(err);
      var User = app.models.User;
      User.create([
        { username: 'John', email: 'john@doe.com', password: 'gotthemilk' },
        { username: 'Jane', email: 'jane@doe.com', password: 'gotthemilk' },
      ], cb);
    });
  }
  // {"email": "john@doe.com", "password": "gotthemilk" }
  const createTodos = (users, cb) => {
    ds.automigrate('Todo', function (err) {
      if (err) return cb(err);
      var Todo = app.models.Todo;
      Todo.create([
        { text: 'Remember the milk', completed: false },
        { text: 'Reminder to remember the milk', completed: false },
        { text: 'Visualize milk as beer', completed: true },
        { text: 'Don\'t forget the milk at the store', completed: false },
      ], cb);
    });
  }

  const createComments = (users, todos, cb) => {
    ds.automigrate('Comment', function (err) {
      if (err) return cb(err);
      var Comment = app.models.Comment;
      Comment.create([
        { text: 'How are you gonna do this?', todoId: todos[0].id, addedBy: users[0].id },
        { text: 'Fear is a great motivator :)', todoId: todos[0].id, addedBy: users[1].id },
        { text: 'Oh, good strategy.', todoId: todos[0].id, addedBy: users[0].id },
        { text: 'Reminder will help', todoId: todos[1].id, addedBy: users[0].id },
        { text: 'Thanks, but whats the reminder? :)', todoId: todos[1].id, addedBy: users[1].id },
        { text: 'You will be remembered.', todoId: todos[1].id, addedBy: users[0].id }
      ], cb);
    });
  }

  createRoles((err, roles) => 
    createUsers(roles, (err,users) =>
      createTodos(roles, (err,todos) => 
        createComments(users, todos, (err,comments) => console.log('SEED DATA INIT DONE'))
    )
  ))
}
  