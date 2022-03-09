const router = require('express').Router();

const authMiddelware = require('../middlewares/authMiddleware');

const {
  getInvoices,
  createInvoice,
  getInvoiceById,
  deleteInvoice,
  updateInvoice,
} = require('../controllers/invoiceController');

router.route('/').get(getInvoices);
router.route('/:id').get(getInvoiceById).delete(deleteInvoice).put(updateInvoice);
router.route('/new').post(createInvoice);

module.exports = router;
