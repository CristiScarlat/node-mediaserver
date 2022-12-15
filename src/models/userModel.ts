module.exports = (sequelize: any, DataTypes: any) => {
    const User = sequelize.define("users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            isEmail: true, //checks for email format
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        created_on: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
        {
            timestamps: false,
            freezeTableName: true
        })
    return User
}