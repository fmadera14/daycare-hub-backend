import { AUTH_ERRORS } from "./auth.errors.js";
import { USER_ERRORS } from "./user.errors.js";

export const errorMap = {
  ...AUTH_ERRORS,
  ...USER_ERRORS,
};
