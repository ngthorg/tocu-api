class ExistError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'ExistError';
  }
}

class NotfoundError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'NotfoundError';
  }
}

class ProviderConnectError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'ProviderConnectError';
  }
}

module.exports = {
  ExistError,
  NotfoundError,
  ProviderConnectError,
};
