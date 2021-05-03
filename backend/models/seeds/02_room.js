
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Phong').del()
    .then(function () {
      // Inserts seed entries
      return knex('Phong').insert([
        { name: "101", type: "single", status: "idle", maxchild: 3, maxadult: 2, price: 1000000, description: "Phong dieu hoa" },
        { name: "102", type: "single", status: "idle", maxchild: 3, maxadult: 2, price: 1000000, description: "Phong dieu hoa" },
        { name: "103", type: "single", status: "idle", maxchild: 3, maxadult: 2, price: 1000000, description: "Phong dieu hoa" },
        { name: "104", type: "single", status: "idle", maxchild: 3, maxadult: 2, price: 1000000, description: "Phong dieu hoa" },
        { name: "105", type: "normal", status: "idle", maxchild: 3, maxadult: 2, price: 1000000, description: "Phong dieu hoa" },
        { name: "201", type: "single", status: "idle", maxchild: 3, maxadult: 2, price: 1000000, description: "Phong dieu hoa" },
        { name: "202", type: "single", status: "idle", maxchild: 3, maxadult: 2, price: 1000000, description: "Phong dieu hoa" },
        { name: "203", type: "single", status: "idle", maxchild: 3, maxadult: 2, price: 1000000, description: "Phong dieu hoa" },
        { name: "204", type: "couple", status: "idle", maxchild: 4, maxadult: 2, price: 1200000, description: "Phong dieu hoa" },
        { name: "205", type: "single", status: "idle", maxchild: 3, maxadult: 2, price: 1000000, description: "Phong dieu hoa" },
      ]);
    });
};
