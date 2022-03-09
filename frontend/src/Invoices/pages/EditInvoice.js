import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';

import InvoiceForm from '../components/InvoiceForm';
import useHideBodyScroll from '../../shared/hooks/useHideBodyScroll';
import useAxios from '../../shared/hooks/useAxios';
import './EditInvoice.css';

const variants = {
  visible: { x: 0, opacity: 1, transition: { duration: 0.3, type: 'tween', stifness: 1000 } },
  hidden: { x: -1000 },
  exit: { x: -1000, opacity: 0, transition: { duration: 0.3, type: 'tween', stifness: 1000 } },
};

const EditInvoice = (props) => {
  const { response, loading, error, fetchData } = useAxios({
    method: 'put',
    url: `/invoices/${useParams().id}`,
  });

  useHideBodyScroll(props.isVisible);

  const editInvoicePage = (
    <AnimatePresence>
      {props.isVisible && (
        <motion.section
          key={1}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="edit-invoice"
        >
          <h1>Create Invoice</h1>
          <InvoiceForm
            formState={{ fetchData, response, loading, error }}
            initialFormValues={props.invoice}
          />
        </motion.section>
      )}
    </AnimatePresence>
  );

  return ReactDOM.createPortal(editInvoicePage, document.getElementById('edit-invoice'));
};

export default EditInvoice;
