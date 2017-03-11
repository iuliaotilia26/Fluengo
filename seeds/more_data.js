
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('teacher').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('teacher').insert({id: 4, name: 'Andrew',description:'very good teacher',language:'portuguese',location:'Paris',level:'beginner',price:'30',currency:'$',duration:'2',email:'andrew@gmail.com'}),
        knex('teacher').insert({id: 5, name: 'Lucia',description:'very good teacher',language:'italian',location:'Amsterdam',level:'beginner',price:'25',currency:'$',duration:'2',email:'lucia@gmail.com'}),
        knex('teacher').insert({id: 6, name: 'Mirabela',description:'very good teacher',language:'spanish',location:'Rome',level:'advanced',price:'20',currency:'$',duration:'2',email:'mirabela@gmail.com'}),
        knex('teacher').insert({id: 7, name: 'Elisabeth',description:'very good teacher',language:'finnish',location:'New York',level:'beginner',price:'20',currency:'$',duration:'2',email:'elisabeth@gmail.com'}),
        knex('teacher').insert({id: 8, name: 'Annabelle',description:'very good teacher',language:'french',location:'Antwerp',level:'advanced',price:'15',currency:'$',duration:'1.5',email:'annebelle@gmail.com'}),
      ]);
    });
};
