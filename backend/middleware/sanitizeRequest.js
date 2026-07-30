function sanitizeObject(value) {
  if (Array.isArray(value)) {
    value.forEach(sanitizeObject);
    return;
  }

  if (!value || typeof value !== 'object') {
    return;
  }

  Object.keys(value).forEach((key) => {
    if (key.startsWith('$') || key.includes('.')) {
      delete value[key];
      return;
    }

    sanitizeObject(value[key]);
  });
}

export function sanitizeRequest(req, res, next) {
  sanitizeObject(req.body);
  sanitizeObject(req.query);
  sanitizeObject(req.params);
  next();
}
