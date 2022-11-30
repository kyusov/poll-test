const { Sequelize } = require('sequelize')
const { DataTypes, Model } = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './poll.sqlite',
    logging: false,
})

class User extends Model {}

User.init(
    {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        fio: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: true
        },
        place: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        question_3: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        question_4: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        question_5: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        question_6: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        question_7: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        question_8: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        question_9: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        question_10: {
            type: DataTypes.BOOLEAN,
            unique: false,
            allowNull: false
        },
        question_11: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: 'user',
    }
)

module.exports = User







sequelize.sync()