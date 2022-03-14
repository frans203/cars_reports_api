const { MigrationInterface, QueryRunner, Table } = require('typeorm');

module.exports = class initialSchema1625847615203 {
    name = 'initialSchema1625847615203';

    async up(QueryRunner) {
        await QueryRunner.createTable(
            new Table({
                name: 'user',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                    },
                    {
                        name: 'admin',
                        type: 'boolean',
                        default: 'true',
                    },
                ],
            }),
        );

        await QueryRunner.createTable(
            new Table({
                name: 'report',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    { name: 'approved', type: 'boolean', default: 'false' },
                    { name: 'price', type: 'float' },
                    { name: 'make', type: 'varchar' },
                    { name: 'model', type: 'varchar' },
                    { name: 'mensuration', type: 'varchar' },
                    { name: 'year', type: 'integer' },
                    { name: 'lng', type: 'float' },
                    { name: 'lat', type: 'float' },
                    { name: 'mileage', type: 'integer' },
                    { name: 'userId', type: 'integer' },
                ],
            }),
        );
    }

    async down(QueryRunner) {
        await QueryRunner.query(`DROP TABLE ""report""`);
        await QueryRunner.query(`DROP TABLE ""user""`);
    }
};