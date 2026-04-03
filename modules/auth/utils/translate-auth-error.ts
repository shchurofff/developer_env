export const translateAuthError = (error: {
  code?: string;
  message?: string;
}) => {
  switch (error.code) {
    case "INVALID_EMAIL_OR_PASSWORD": {
      return "Некорректный email или пароль";
    }
    case "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL": {
      return "Пользователь с таким email уже существует. Используйте другой для регистрации или войдите в аккаунт";
    }
    default:
      return "Ошибка обработки формы. Попробуйте повторно";
  }
};
