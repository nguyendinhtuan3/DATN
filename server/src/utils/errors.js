class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.code = "NOT_FOUND";
  }
}

class UploadError extends Error {
  constructor(message) {
    super(message);
    this.name = "UploadError";
    this.code = "UPLOAD_FAIL";
  }
}

module.exports = { NotFoundError, UploadError };
