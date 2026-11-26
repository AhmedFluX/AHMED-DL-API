function send(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload, null, 2));
}

function ok(res, result, extra = {}) {
  return send(res, 200, {
    status: true,
    creator: "AHMED-MD",
    version: "1.0.0",
    result,
    ...extra
  });
}

function fail(res, status, code, message) {
  return send(res, status, {
    status: false,
    creator: "AHMED-MD",
    error: {
      code,
      message
    }
  });
}

module.exports = { send, ok, fail }; 
