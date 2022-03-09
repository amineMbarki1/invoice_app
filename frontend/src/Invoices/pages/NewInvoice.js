import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

import InvoiceForm from '../components/InvoiceForm';
import useHideBodyScroll from '../../shared/hooks/useHideBodyScroll';
import useAxios from '../../shared/hooks/useAxios';
import './NewInvoice.css';

const variants = {
  visible: { x: 0, opacity: 1, transition: { duration: 0.3, type: 'tween', stifness: 1000 } },
  hidden: { x: -1000 },
  exit: { x: -1000, opacity: 0, transition: { duration: 0.3, type: 'tween', stifness: 1000 } },
};

const NewInvoice = (props) => {
  const { response, loading, error, fetchData } = useAxios({
    method: 'post',
    url: '/invoices/new',
  });

  useHideBodyScroll(props.isVisible);

  const newInvoicePage = (
    <AnimatePresence>
      {props.isVisible && (
        <motion.section
          key={1}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="new-invoice"
        >
          <h1>Create Invoice</h1>
          <InvoiceForm formState={{ response, fetchData, loading, error }} />
        </motion.section>
      )}
    </AnimatePresence>
  );

  return ReactDOM.createPortal(newInvoicePage, document.getElementById('new-invoice'));
};

export default NewInvoice;
