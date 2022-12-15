const { Sequelize, DataTypes } = require('sequelize')

//Database connection with dialect of postgres specifying the database we are using
//port for my database is 5433
//database name is discover
const sequelize = new Sequelize(`postgres://${process.env.dbUser}:${process.env.dbPass}@localhost:5432/mediaserver`, { dialect: "postgres" })

//checking if connection is done
sequelize.authenticate().then(() => {
    console.log(`Database connected to mediaServer`)
}).catch((err: any) => {
    console.log(err)
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    users: require('./userModel')(sequelize, DataTypes)
}