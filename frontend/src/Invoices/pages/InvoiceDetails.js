import { Fragment } from 'react';
import { useParams, Redirect, Link } from 'react-router-dom';
import useAxios from '../../shared/hooks/useAxios';

import Invoice from '../components/Invoice';
import EditInvoice from './EditInvoice';
import useModal from '../../shared/hooks/useModal';
import Backdrop from '../../shared/components/Backdrop';
import Modal from '../../shared/components/Modal';
import Button from '../../shared/components/Button';
import { ReactComponent as BackIcon } from '../../shared/icons/arrow-back.svg';

const InvoiceDetails = (props) => {
  const { id } = useParams();
  const { response, loading, error } = useAxios({
    url: `/invoices/${id}`,
  });

  const {
    // eslint-disable-next-line
    response: deleteResponse,
    // eslint-disable-next-line
    loading: deleteLoading,
    // eslint-disable-next-line
    error: deleteError,
    // eslint-disable-next-line
    fetchData: deleteInvoice,
  } = useAxios({
    method: 'delete',
    url: `/invoices/${id}`,
  });

  const [isOpen, setIsOpen] = useModal();

  if (loading) return <h1>Loading ....</h1>;
  if (error) return <h1>Error</h1>;
  if (deleteResponse) return <Redirect to="/invoices" />;

  return (
    response && (
      <Fragment>
        <Modal onCloseModalHandler={() => setIsOpen(false)} isVisible={isOpen}>
          <div className="modal__header">
            <h2>Are You sure you want to delete this Invoice</h2>
          </div>
          <div className="modal__content">
            <p>This will delete the invoice permanently</p>
            <p>Are You sure?</p>
          </div>
          <div className="modal__footer">
            <Button clickHandler={() => setIsOpen(false)} btnAction="cancel">
              Cancel
            </Button>
            <Button clickHandler={deleteInvoice} btnAction="delete">
              {deleteLoading ? 'laoding...' : 'delete'}
            </Button>
          </div>
        </Modal>
        <Backdrop isVisible={props.editInvoice} page={`/invoices/${id}`} />
        <EditInvoice isVisible={props.editInvoice} invoice={response} />
        <Link style={{ display: 'flex', alignItems: 'center', margin: '2rem 0' }} to="/invoices">
          <BackIcon style={{ height: '1rem', marginRight: '5px', fill: '#9F87FE' }} /> Go back
        </Link>
        <Invoice onOpenCloseModalHandler={setIsOpen} invoice={response} />;
      </Fragment>
    )
  );
};

export default InvoiceDetails;
