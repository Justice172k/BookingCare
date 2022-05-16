'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: "admin@gmail.com",
      password: "123456",
      firstName: "nguyen",
      lastName: "tien",
      address: "ngo 1 khuat duy tien",
      gender: 1,
      typeRole: "ROLE",
      typekey: "R1",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};


