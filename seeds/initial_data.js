
exports.seed = function(knex, Promise) {

  return knex('teacher').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('teacher').insert({id: 1, name: 'Andreea',description:'very good teacher',language:'spanish',location:'Amsterdam',level:'beginner',price:'20',currency:'$',duration:'1.5',email:'andreea@example.com'}),
        knex('teacher').insert({id: 2, name: 'Jean-Paul',description:'very good teacher',language:'french',location:'London',level:'advanced',price:'30',currency:'$',duration:'2',email:'jeanpaul@example.com'}),
        knex('teacher').insert({id: 3, name: 'Lucia',description:'very good teacher',language:'portuguese',location:'Rome',level:'beginner',price:'25',currency:'$',duration:'2',email:'lucia@example.com'})
      ]);
    });
};
