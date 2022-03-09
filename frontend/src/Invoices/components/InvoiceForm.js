import { useForm, useFieldArray } from 'react-hook-form';
import { Redirect } from 'react-router-dom';

import Button from '../../shared/components/Button';
import { ReactComponent as TrashIcon } from '../../shared/icons/trash.svg';
import './InvoiceForm.css';

const InvoiceForm = (props) => {
  const initialFormValues = props.initialFormValues
    ? props.initialFormValues.invoice
    : {
        paymentDue: '',
        description: '',
        paymentTerms: '1',
        clientName: '',
        clientEmail: '',
        status: '',
        senderAddress: {
          street: '',
          city: '',
          postCode: '',
          country: '',
        },
        clientAddress: {
          street: '',
          city: '',
          postCode: '',
          country: '',
        },
        items: [{ name: '', price: 0, quantity: 0 }],
        total: 0,
      };

  const discardLink = props.initialFormValues
    ? `/invoices/${props.initialFormValues.invoice._id}`
    : '/invoices';

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: initialFormValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const onAppendClick = (e) => {
    e.preventDefault();
    append({ name: '', quantity: 0, price: 0 });
  };

  const onRemoveClick = (index) => (e) => {
    e.preventDefault();
    if (index !== 0) remove(index);
  };

  const {
    response,
    loading,
    // eslint-disable-next-line
    error,
    fetchData,
  } = props.formState;

  console.log(`response: ${response} loading: ${loading} error: ${error}`);

  const onSubmit = (data, { nativeEvent: e }) => {
    const { action } = e.submitter.dataset;
    data.status = action === 'save' ? 'pending' : 'draft';
    fetchData(data);
  };

  const calcTotal = (index) => {
    const { price, quantity } = watch('items')[index];
    return parseFloat(price) * parseFloat(quantity);
  };

  if (response?.success) return <Redirect to={{ pathname: discardLink, state: { rerender: true } }} />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="invoice-form">
      <div className="invoice-form__inputs-container">
        <h2>Bill From</h2>
        <div className="invoice-form__item">
          <label className={errors.senderAddress?.street && 'label-error'} htmlFor="senderStreet">
            Street Address
          </label>
          <input
            className={errors.senderAddress?.street && 'input-error'}
            {...register('senderAddress.street', {
              required: true,
            })}
            type="text"
          />
        </div>
        <div className="flex">
          <div className="invoice-form__item">
            <label className={errors.senderAddress?.city && 'label-error'} htmlFor="senderAddress.city">
              City
            </label>
            <input
              className={errors.senderAddress?.city && 'input-error'}
              {...register('senderAddress.city', {
                required: true,
              })}
              type="text"
            />
          </div>
          <div className="invoice-form__item">
            <label className={errors.senderAddress?.postCode && 'label-error'} htmlFor="senderPostCode">
              Post Code
            </label>
            <input
              className={errors.senderAddress?.postCode && 'input-error'}
              {...register('senderAddress.postCode', {
                required: true,
              })}
              type="text"
            />
          </div>
          <div className="invoice-form__item">
            <label className={errors.senderAddress?.country && 'label-error'} htmlFor="senderAddress.country">
              Country
            </label>
            <input
              className={errors.senderAddress?.country && 'input-error'}
              {...register('senderAddress.country', {
                required: true,
              })}
              type="text"
            />
          </div>
        </div>
        <h2>Bill to</h2>
        <div className="invoice-form__item">
          <label className={errors.clientName && 'label-error'} htmlFor="clientName">
            Client Name
          </label>
          <input
            className={errors.clientName && 'input-error'}
            {...register('clientName', {
              required: true,
            })}
            type="text"
          />
        </div>
        <div className="invoice-form__item">
          <label className={errors.clientEmail && 'label-error'} htmlFor="clientEmail">
            Client Email
          </label>
          <input
            className={errors.clientEmail && 'input-error'}
            {...register('clientEmail', {
              required: true,
            })}
            type="text"
          />
        </div>
        <div className="invoice-form__item">
          <label className={errors.clientAddress?.street && 'label-error'} htmlFor="clientStreet">
            Street Address
          </label>
          <input
            className={errors.clientAddress?.street && 'input-error'}
            {...register('clientAddress.street', {
              required: true,
            })}
            type="text"
          />
        </div>
        <div className="flex">
          <div className="invoice-form__item">
            <label className={errors.clientAddress?.city && 'label-error'} htmlFor="clientCity">
              City
            </label>
            <input
              className={errors.clientAddress?.city && 'input-error'}
              {...register('clientAddress.city', {
                required: true,
              })}
              type="text"
            />
          </div>
          <div className="invoice-form__item">
            <label className={errors.clientAddress?.postCode && 'label-error'} htmlFor="clientPostCode">
              Post Code
            </label>
            <input
              className={errors.clientAddress?.postCode && 'input-error'}
              {...register('clientAddress.postCode', {
                required: true,
              })}
              type="text"
            />
          </div>
          <div className="invoice-form__item">
            <label className={errors.clientAddress?.country && 'label-error'} htmlFor="clientAddress.Country">
              Country
            </label>
            <input
              className={errors.clientAddress?.country && 'input-error'}
              {...register('clientAddress.country', {
                required: true,
              })}
              type="text"
            />
          </div>
        </div>
        <div className="flex">
          <div className="invoice-form__item">
            <label className={errors.paymentDue && 'label-error'} htmlFor="paymentDue">
              Invoice date
            </label>
            <input
              className={errors.paymentDue && 'input-error'}
              {...register('paymentDue', {
                required: true,
              })}
              type="date"
            />
          </div>
          <div className="invoice-form__item">
            <label className={errors.paymentTerms && 'label-error'} htmlFor="paymentTerms">
              Payment Terms
            </label>
            <select
              className={errors.paymentTerms && 'input-error'}
              {...register('paymentTerms', {
                required: true,
              })}
              name="paymentTerms"
            >
              <option value="1">Net 1 Days</option>
              <option value="7">Net 7 Days</option>
              <option value="14">Net 14 Days</option>
              <option value="30">Net 30 Days</option>
            </select>
          </div>
        </div>
        <div className="invoice-form__item">
          <label className={errors.description && 'label-error'} htmlFor="description">
            Description
          </label>
          <input
            className={errors.description && 'input-error'}
            {...register('description', {
              required: true,
            })}
            name="description"
          />
        </div>
        <h2>Item List</h2>
        {fields.map((item, index) => (
          <div key={item.id} className="flex">
            <div className="invoice-form__item">
              <label className={errors.items?.[index]?.name && 'label-error'} htmlFor="name">
                Item Name
              </label>
              <input
                className={errors.items?.[index]?.name && 'input-error'}
                {...register(`items.${index}.name`, {
                  required: true,
                })}
                type="text"
              />
            </div>
            <div className="invoice-form__item">
              <label className={errors.items?.[index]?.quantity && 'label-error'} htmlFor="quantity">
                Qty.
              </label>
              <input
                className={errors.items?.[index]?.quantity && 'input-error'}
                {...register(`items.${index}.quantity`, {
                  required: true,
                  min: 1,
                })}
                type="number"
              />
            </div>
            <div className="invoice-form__item">
              <label className={errors.items?.[index]?.price && 'label-error'} htmlFor="price">
                Price
              </label>
              <input
                className={errors.items?.[index]?.price && 'input-error'}
                {...register(`items.${index}.price`, {
                  required: true,
                  min: 1,
                })}
                type="number"
              />
            </div>
            <div className="invoice-form__item">
              <label>Total</label>
              <input value={calcTotal(index)} type="number" disabled />
            </div>
            {index !== 0 && (
              <div className="invoice-form__item" style={{ alignSelf: 'end' }}>
                <Button clickHandler={onRemoveClick(index)}>
                  <TrashIcon />
                </Button>
              </div>
            )}
          </div>
        ))}
        <Button clickHandler={onAppendClick}>Add Item</Button>
      </div>
      <div className="invoice-form__action flex">
        <Button btnAction="discard" to={discardLink}>
          Discard
        </Button>
        <Button btnAction="save-as-draft">Save as Draft</Button>
        <Button btnAction="save">{loading ? 'Lading ...' : 'Save'}</Button>
      </div>
    </form>
  );
};

export default InvoiceForm;
