import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import Badge from '../../shared/components/Badge';
import './InvoiceItem.css';

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const InvoiceItem = ({ paymentDue, clientName, total, id, status, _id }) => {
  return (
    <AnimatePresence>
      <motion.li
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="invoice-item card"
        key={id}
      >
        <Link to={`/invoices/${_id}`}>
          <div className="invoice-item__id">
            <span>#</span>
            {id}
          </div>
          <div className="invoice-item__payment-due">Due {new Date(paymentDue).toDateString()}</div>
          <div className="break"></div>
          <div className="invoice-item__client-name">{clientName}</div>
          <div className="invoice-item__total">{total}$</div>
          <Badge status={status} />
        </Link>
      </motion.li>
    </AnimatePresence>
  );
};

export default InvoiceItem;
