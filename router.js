const app = require('express');
const router = app.Router();
const modules = require('./crud')

router.post('/register',modules.register)
router.get('/pageload',modules.pageload)
router.put('/update/:id',modules.update)
router.delete('/delete/:id',modules.deleteusers)

module.exports = router;