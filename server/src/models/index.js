require('dotenv').config();
const path = require('path');
const { sequelize } = require('../config/mysql');
const Sequelize = require('sequelize');

const db = {
    mysql: {},
};

// Danh sách model MySQL theo thứ tự load
const mysqlModelsOrder = [
    'CourseType',
    'FrameVocabulary.js',
    'User.js',
    'Course.js',
    'Lesson.js',
    'UserFrameItem.js',
    'Frame.js',
    'Vocabulary.js',
];

// Load models MySQL
mysqlModelsOrder.forEach((file) => {
    const model = require(path.join(__dirname, 'mysql', file));
    const modelName = model?.name || file.replace('.js', '');
    db.mysql[modelName] = model;
});

// Gọi associate nếu có
Object.values(db.mysql).forEach((model) => {
    if (typeof model.associate === 'function') {
        model.associate(db.mysql);
    }
});

// Sync các bảng
const queryInterface = sequelize.getQueryInterface();

(async () => {
    try {
        for (const modelName of Object.keys(db.mysql)) {
            const model = db.mysql[modelName];
            const tableName = model.getTableName();

            const exists = await queryInterface
                .describeTable(tableName)
                .then(() => true)
                .catch(() => false);

            if (!exists) {
                await model.sync();
                console.log(`✅ Created table: ${tableName}`);
            } else {
                console.log(`ℹ️ Skipped existing table: ${tableName}`);
            }
        }

        console.log('🎉 All MySQL models checked and synced (if needed).');
    } catch (err) {
        console.error('❌ Table sync error:', err.message);
    }
})();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
