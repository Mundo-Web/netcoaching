class Global {
  static PUBLIC_RSA_KEY = null;
  static APP_NAME = null;
  static APP_URL = null;
  static APP_DOMAIN = null;
  static APP_PROTOCOL = null;

  static set = (name, value) => {
    Global[name] = value;
  }

  static get = (name) => {
    return Global[name]
  }
}

export default Global