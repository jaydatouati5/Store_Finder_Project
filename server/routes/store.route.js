const StoreController = require('../controllers/store.controller');


module.exports = (app) => {
    app.get('/api/store/:id' , StoreController.getOne);
    app.get('/api/store',  StoreController.getAll);
    app.post('/api/store',  StoreController.create);
    app.put('/api/store/:id',  StoreController.update);
    app.delete('/api/store/:id',  StoreController.delete);
}