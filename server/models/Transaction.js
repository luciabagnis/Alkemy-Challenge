module.exports = ( sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction',{
        concept: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Transaction.associate = (models) => {
        Transaction.belongsTo(models.User, {
            onDelete: "cascade"
        },{
            foreignKey: "UserId"
        })
    }

    return Transaction
}

