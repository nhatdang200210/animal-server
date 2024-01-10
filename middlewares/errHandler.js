exports.errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
  
    // Lỗi trùng email
    if (err.code === 11000) {
      err.statusCode = 400;
      for (let p in err.keyValue) {
        err.message = `${p} must be unique`;
      }
    }
  
    // Lỗi ObjectId: không tìm thấy
    if (err.kind === "ObjectId") {
      err.statusCode = 404;
      err.message = `The ${req.originalUrl} is not found due to an incorrect ID`;
    }
  
    // Lỗi validation
    if (err.errors) {
      err.statusCode = 400;
      err.message = [];
      for (let p in err.errors) {
        err.message.push(err.errors[p].properties.message);
      }
    }
  
    res.status(err.statusCode).json({
      status: 'fail',
      message: err.message
    });
  };