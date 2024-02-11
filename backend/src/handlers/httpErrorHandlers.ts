import { ErrorRequestHandler, RequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(400).json({ message: err.message });
};

export const notFoundHandler: RequestHandler = (req, res, next) => {
  res.status(404).json({ message: "The requested URL was not found" });
};
