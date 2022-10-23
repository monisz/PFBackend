const router = require('express').Router();
const isAdmin = require('../../middlewares/isAdmin');
const logger = require('../../../utils/loggers/winston');
const { getInfo } = require('./controllersInfo');

const admin = process.env.ADMIN;
logger.info(`admin en routerInfo ${admin}`);

router.get('/', isAdmin, getInfo);

module.exports = router;