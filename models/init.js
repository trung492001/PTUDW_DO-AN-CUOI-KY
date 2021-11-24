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
db.once('open', async () => {
    console.info('Database connection established...');
    console.log('Initializing sample data...');
    try {
        await initData('dish', './sample/dishes.json');
        await initData('staff', './sample/staffs.json');
        await initData('customer', './sample/customers.json');
        await initData('cart', './sample/carts.json');
        console.info('All sample data initialized successfully...');
    }
    catch (error) {
        console.error(error);
    }
    await db.close();
    console.info('Database connection closed...');
});

