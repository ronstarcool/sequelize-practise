const Sequelize = require('sequelize');

const sequelize = new Sequelize('garage', 'postgres', '0101', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5433,
  pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
  },
});

// USER =============================================
const User = sequelize.define('user', {
  // attributes
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING
    // allowNull defaults to true
  },
  info: {
    type: Sequelize.STRING,
  }
}, {
  // options
});

// PROJECT ======== source and target
const Project = sequelize.define('project', {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
});

User.hasOne(Project); 
// in dit geval: source = User, target = Project
// creates userId column on project

// sequelize.sync({ force: true }); // drop and create all tables

module.exports = {
  sequelize,
  User,
  Project,
};