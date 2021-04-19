/** ==============================
 * 空文字が入力されていないかチェック
 =============================== */
export const isValidRequiredInput = (...args: string[]): boolean => {
  let validator = true;
  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === "") {
      validator = false;
    }
  }
  return validator;
};

/** ===============================
 * メールアドレスの形式が正しいかチェック
 ================================= */
export const isValidEmailtFormat = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-z-A-Z0-9-]+)*$/;
  return regex.test(email);
};
