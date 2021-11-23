const mongoose = require('mongoose');

const initData = async (modelName, dataPath) => {
    const Model = require(`./${modelName}.model`);
    const data = require(dataPath);
    await Model.deleteMany({});
    await Model.create(data);
    console.log(`Initialized ${modelName} data...`);
}

require('dotenv').config();
mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', () => {
    console.error('Database connection failed')
});
db.once('open', () => {
    console.info('Database connection established...');
    console.log('Initializing sample data...');
    Promise.all([
        initData('dish', './sample/dishes.json'),
    ]).then(() => {
        console.log('All sample data initialized successfully...');
        db.close();
        console.info('Database connection closed...');
    }).catch((error) => {
        console.error('Error: ', error);
        db.close();
        console.info('Database connection closed...');
    });
});

