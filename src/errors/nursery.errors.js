export const NURSERY_ERRORS = {
  MISSING_USER_ID: {
    status: 400,
    message: "Falta el userId para crear el nursery",
  },

  INVALID_USER_ID: {
    status: 400,
    message: "userId invalido",
  },

  MISSING_NURSERY_NAME: {
    status: 400,
    message: "Falta el nurseryNm para crear el nursery",
  },

  MISSING_ADDRESS: {
    status: 400,
    message: "Falta el addressTxt para crear el nursery",
  },

  MISSING_OPEN_SINCE: {
    status: 400,
    message: "Falta el openSince para crear el nursery",
  },

  INVALID_OPEN_SINCE_DATE: {
    status: 400,
    message: "openSince invalido",
  },
};
