import InvoiceItem from './InvoiceItem';

const InvoicesList = ({ invoices }) => {
  if (!invoices) return <h1>error</h1>;
  const invoiceItems = invoices.map((invoice, i) => (
    <InvoiceItem
      key={invoice._id}
      id={invoice.id}
      _id={invoice._id}
      clientName={invoice.clientName}
      status={invoice.status}
      paymentDue={invoice.paymentDue}
      total={invoice.total}
      invoice={invoice}
    />
  ));

  return <ul>{invoiceItems}</ul>;
};
export default InvoicesList;
