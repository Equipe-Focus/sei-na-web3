module.exports = (sequelize, DataType) => {
    const Models = sequelize.define('Models', {
        id: {
            type: DataType.STRING,
            primaryKey: true,
        },
        description: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        attr: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        modelName: {
            type: DataType.STRING,
            allowDuplicate: false,
            allowNull: false,
            validate: {
                notEmpty: false,
            },
        },
        attrNotNull: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: true,
            },
        },
    });
    return Models;
};
