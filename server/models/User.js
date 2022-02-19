module.exports = ( sequelize, DataTypes ) => {

    const User = sequelize.define('User', {
        first_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password_confirmation:{
            type: DataTypes.STRING,
            allowNull: false
        },
        total_balance: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    });

    User.associate = (models) => {
        User.hasMany(models.Transaction, {
            onDelete: "cascade"
        },{
            foreignKey: "UserId"
        })
    }

    return User;
}