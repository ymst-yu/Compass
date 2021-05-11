// 64文字のランダムな文字列を生成する
export const generateRandomString = () => {
  const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const N = 64;
  const randomString = Array.from(crypto.getRandomValues(new Uint32Array(N)))
    .map((n) => S[n % S.length])
    .join("");
  return randomString;
};

// 空文字が入力されていないかチェック
export const isValidRequiredInput = (...args: string[]): boolean => {
  let validator = true;
  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === "") {
      validator = false;
    }
  }
  return validator;
};

/**
 * メールアドレスの形式チェック
 * @param email "ユーザーが入力したメールアドレス"
 * @returns {boolean}
 */
export const isValidEmailtFormat = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-z-A-Z0-9-]+)*$/;
  return regex.test(email);
};

/**
 * 現在の日付文字列を生成する
 * @returns {string} "2021/01/01(金)"
 */
export const generateNowDateString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = ("0" + (now.getMonth() + 1)).slice(-2);
  const date = ("0" + now.getDate()).slice(-2);
  const day = now.getDay();
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const time = year + "/" + month + "/" + date + `(${weekdays[day]})`;
  return time;
};
