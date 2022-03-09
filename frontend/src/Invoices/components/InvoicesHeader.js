import { ReactComponent as ExpandIcon } from '../../shared/icons/expand.svg';
import { ReactComponent as AddIcon } from '../../shared/icons/add.svg';
import { useState } from 'react';

import Button from '../../shared/components/Button';
import './InvoicesHeader.css';

const InvoicesHeader = (props) => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [checkedBox, setCheckedBox] = useState(null);
  const openCloseDropdownMenuHandler = () => setDropdownMenu(!dropdownMenu);

  const handleCheckedInput = (e) => {
    const filterBy = e.target.checked ? e.target.value : null;

    setCheckedBox(filterBy);
    props.onFilterChange(filterBy);
  };

  return (
    <header className="invoices-header">
      <div className="invoices-header__left">
        <h2 className="invoices-header__title">Invoices</h2>
        <p className="invoices-header__count">
          There are total {props.invoicesCount} invoices
        </p>
      </div>
      <div className="invoices-header__right">
        <div className="dropdown-container">
          {/* TODO: Extract dropdown into it's own component */}
          <Button
            clickHandler={openCloseDropdownMenuHandler}
            className="center"
          >
            Filter By Status <ExpandIcon />
          </Button>
          {dropdownMenu && (
            <ul className="dropdown-menu card">
              <li>
                <input
                  onChange={handleCheckedInput}
                  type="checkbox"
                  name="paid"
                  id="paid"
                  value="paid"
                  checked={checkedBox === 'paid'}
                />
                <label htmlFor="paid">PAID</label>
              </li>
              <li>
                <input
                  onChange={handleCheckedInput}
                  type="checkbox"
                  name="pending"
                  id="pending"
                  value="pending"
                  checked={checkedBox === 'pending'}
                />
                <label htmlFor="pending">PENDING</label>
              </li>
              <li>
                <input
                  onChange={handleCheckedInput}
                  type="checkbox"
                  name="overdue"
                  id="overdue"
                  value="overdue"
                  checked={checkedBox === 'overdue'}
                />
                <label htmlFor="overdue">OVERDUE</label>
              </li>
              <li>
                <input
                  onChange={handleCheckedInput}
                  type="checkbox"
                  name="draft"
                  id="draft"
                  value="draft"
                  checked={checkedBox === 'draft'}
                />
                <label htmlFor="draft">DRAFT</label>
              </li>
            </ul>
          )}
        </div>

        <Button to="/invoices/new" btnAction="new" className="center">
          <AddIcon />
          New Invoice
        </Button>
      </div>
    </header>
  );
};

export default InvoicesHeader;
