'use strict';
const Invoice = require('../models/invoice');
const HTTPError = require('../utils/httpError');

exports.getInvoices = async (req, res, next) => {
  const { filter } = req.query;
  const { _id: userId } = req.user;
  try {
    const invoices = await Invoice.find(filter ? { status: filter, user: userId } : { user: userId });
    if (!invoices || invoices.length == 0) throw new HTTPError(404, 'No Invoices were found');
    res.status(200).json({ invoices, success: true });
  } catch (error) {
    next(error);
  }
};

exports.getInvoiceById = async (req, res, next) => {
  try {
    const { id } = req.params;

    //  CastError will occur with invalid id
    // CastError not handled in error middleware
    const invoice = await Invoice.findById(id).where('user', req.user?._id);

    if (!invoice) throw new HTTPError(404, 'No Invoice was found with this id');
    res.status(200).json({
      success: true,
      invoice,
    });
  } catch (error) {
    next(error);
  }
};

exports.createInvoice = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    const invoice = await Invoice.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Invoice created successfully',
      invoice,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteInvoice = async (req, res, next) => {
  const { id } = req.params;
  try {
    //  CastError will occur with invalid id
    let invoice = await Invoice.findById(id).where('user', req.user?._id);

    if (!invoice) throw new HTTPError(404, 'No Invoice was found with this id');

    await Invoice.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Invoice deleted',
    });
  } catch (error) {
    next(error);
  }
};

exports.updateInvoice = async (req, res, next) => {
  const { id } = req.params;
  try {
    //  CastError will occur with invalid id
    let invoice = await Invoice.findById(id).where('user', req.user?._id);

    if (!invoice) throw new HTTPError(404, 'No Invoice was found with this id');

    invoice = await Invoice.findByIdAndUpdate(id, req.body, { new: true });

    res.json({
      success: true,
      invoice,
    });
  } catch (error) {
    next(error);
  }
};
