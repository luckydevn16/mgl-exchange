/* learn more: https://github.com/testing-library/jest-dom // @testing-library/jest-dom library provides a set of custom jest matchers that you can use to extend jest. These will make your tests more declarative, clear to read and to maintain.*/


const router = require('express').Router();
const auth = require('../../middleware/auth.middleware');
const Role = require('../../utils/userRoles.utils');
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware');
const P2PController = require("../../controllers/p2p.controller.js");
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './upload')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})

const upload = multer({storage})

router.post('/create', auth(Role.Super), awaitHandlerFactory(P2PController.createP2P));
router.post('/id/:id', auth(Role.Super), awaitHandlerFactory(P2PController.updateP2P));
router.delete('/id/:id', auth(Role.Super), awaitHandlerFactory(P2PController.deleteP2P));
router.get('/', awaitHandlerFactory(P2PController.getAllP2P));
router.get('/id/:id', awaitHandlerFactory(P2PController.getOneP2P));
router.post('/upload', upload.single('avatar'), awaitHandlerFactory(P2PController.uploadImage));

module.exports = router
