const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

router.post('/', applicationController.createApplication);
router.get('/:user_id', applicationController.getApplications);
router.put('/:app_id', applicationController.updateApplication);
router.delete('/:app_id', applicationController.deleteApplication);
router.put('/:app_id/status', applicationController.updateStatus);

module.exports = router;
