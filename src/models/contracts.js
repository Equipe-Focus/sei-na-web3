module.exports = (sequelize, DataType) => {
    const Contracts = sequelize.define('Contracts', {
        id: {
            type: DataType.STRING,
            primaryKey: true,
        },
        blockchain: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            references: {
                model: 'Blockchains',
                key: 'id',
            },
        },
        address: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    });

    return Contracts;
};
