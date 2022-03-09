import { Fragment } from 'react';

import Badge from '../../shared/components/Badge';
import Button from '../../shared/components/Button';
import './Invoice.css';

const Invoice = ({ invoice: { invoice }, onOpenCloseModalHandler }) => {
  return (
    <Fragment>
      <div className="card invoice-actions">
        <div className="invoice-actions__left">
          <p>status</p>
          <Badge status={invoice.status} />
        </div>
        <div className="invoice-actions__right">
          <Button btnAction="edit" to={`${invoice._id}/edit`}>
            Edit
          </Button>
          <Button clickHandler={() => onOpenCloseModalHandler(true)} btnAction="delete">
            Delete
          </Button>
          <Button btnAction="mark-as-paid">Mark As Paid</Button>
        </div>
      </div>
      <div className="card invoice-details">
        {/* Better Class names than __first, __second __third?? */}
        <section>
          <div className="left">
            <p className="invoice-details__id text-bold">
              <span>#</span>
              {invoice.id}
            </p>
            <p className="invoice-details__description text-light">{invoice.description}</p>
          </div>
          <div className="right">
            <p className="text-light">{invoice.senderAddress.street}</p>
            <p className="text-light">{invoice.senderAddress.city}</p>
            <p className="text-light">{invoice.senderAddress.postCode}</p>
            <p className="text-light">{invoice.senderAddress.country}</p>
          </div>
        </section>

        <section>
          <div>
            <div className="invoice-details__date">
              <p className="text-light">Invoice Date</p>
              <p className="text-bold">{new Date(invoice.createdAt).toDateString()}</p>
            </div>
            <div className="invoice-details__due">
              <p className="text-light">Payment Due</p>
              <p className="text-bold">{new Date(invoice.paymentDue).toDateString()}</p>
            </div>
          </div>
          <div>
            <p className="text-light">Bill To</p>
            <p className="text-bold invoice-details__client-name">{invoice.clientName}</p>
            <p className="text-light">{invoice.clientAddress.street}</p>
            <p className="text-light">{invoice.clientAddress.city}</p>
            <p className="text-light">{invoice.clientAddress.postCode}</p>
            <p className="text-light">{invoice.clientAddress.country}</p>
          </div>
          <div>
            <p className="text-light">Send To</p>
            <p className="text-bold invoice-details__client-email">{invoice.clientEmail}</p>
          </div>
        </section>

        <section>
          <table className="invoice-details__items">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>QTY.</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                  <td>${item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="invoice-details__total">
            <p>Amount Due</p>
            <p className="text-bold">${invoice.total}</p>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default Invoice;
