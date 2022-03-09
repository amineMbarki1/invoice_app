import { Fragment, useState } from 'react';

import useAxios from '../../shared/hooks/useAxios';
import NewInvoice from './NewInvoice';
import InvoicesList from '../components/InvoicesList';
import InvoicesHeader from '../components/InvoicesHeader';
import Backdrop from '../../shared/components/Backdrop';

const Invoices = (props) => {
  const [filterBy, setFilterBy] = useState(null);
  const handleFilterChange = (filterBy) => {
    setFilterBy(filterBy);
  };

  const { response, error, loading } = useAxios({
    url: `/invoices${filterBy ? '?filter=' + filterBy : ''}`,
  });

  return (
    <Fragment>
      <NewInvoice isVisible={props.newInvoice} />
      <Backdrop isVisible={props.newInvoice} page="/invoices" />
      <InvoicesHeader onFilterChange={handleFilterChange} invoicesCount={response?.length} />
      {/* TODO Handle errors */}
      {error && <h1>{error.response?.data?.message ? error.response?.data?.message : 'error'}</h1>}
      {/* TODO Handle loading state */}
      {loading && <h1>Loading... </h1>}
      {response && <InvoicesList invoices={error?.response?.status ? [] : response.invoices} />}
    </Fragment>
  );
};

export default Invoices;
