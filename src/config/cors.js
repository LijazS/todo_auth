const buildCorsOptions = (allowedOrigins) => {
  if (!allowedOrigins || allowedOrigins === '*') {
    return { origin: true, credentials: true };
  }

  const allowed = allowedOrigins.split(',').map((value) => value.trim()).filter(Boolean);

  return {
    origin(origin, callback) {
      if (!origin || allowed.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Origin not allowed by CORS'));
    },
    credentials: true,
  };
};

module.exports = buildCorsOptions;
