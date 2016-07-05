var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true, //não permite string vazia
			len: [1, 250] //Mínimo e máximo
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false		
	}
});

sequelize.sync({
	//force: true //Deleta e recria a base de dados sempre que inicar o sistema.
}).then(function() {
	console.log('Everything is synced');

	Todo.findById(3).then(function(todo){
		if (todo) {
			console.log(todo.toJSON());
		} else {
			console.log('Todo not found');
		}
	})
/*
	Todo.create({
		description: 'Walking my dog',
		completed: false
	}).then(function(todo) {
		//console.log('Finished!');
		//console.log(todo);
		return Todo.create({
			description:'Clean office'
		});
	}).then(function(){
		//return Todo.findById(1); //retorna o objeto
		return Todo.findAll({
			where: {
				description: {
					$like: '%office%'
				}
			}
		});
	}).then(function(todos){
		if (todos) {
			todos.forEach(function(todo){
				console.log(todo.toJSON());	
			});			
		} else {
			console.log('no todo found!');
		}
	}).catch(function(e){
		console.log(e);
	});
*/
});