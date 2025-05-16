require('dotenv').config();
const path = require('path');
const { sequelize } = require('../config/mysql');
const Sequelize = require('sequelize');

const db = {
    mysql: {},
};

// Danh sách model MySQL theo thứ tự load
const mysqlModelsOrder = [
    'Role',
    'CourseType',
    'Badge.js',
    'ItemType.js',
    'User.js',
    'UserBadge.js',
    'UserItem.js',
    'UserReward.js',
    'Course.js',
    'CourseUser.js',
    'Lesson.js',
    'Vocabulary.js',
    'WordMeaning.js',
    'Question.js',
    'Answer.js',
    'MiniTest.js',
    'TestResult.js',
    'MockTest.js',
    'MockResult.js',
    'MiniGame.js',
    'MiniGameCourse.js',
    'MasteryRoad.js',
    'Progress.js',
    'Garden.js',
    'Land.js',
    'LandItem.js',
    'GardenItem.js',
    'Floor.js',
    'Tower.js',
    'Item.js',
    'Image.js',
    'Audio.js',
    'Reward.js',
    'Payment.js',
    'Transaction.js',
    'Invoice.js',
    'Notification.js',
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
