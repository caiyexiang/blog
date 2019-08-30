type IsLeagal = (str: string) => boolean;

type Validator = (rule: any, value: string, callback: any) => void;

const isLegalEmail: IsLeagal = str => {
  const pattern = new RegExp(
    '^([a-z0-9_\\.-]+)@([\\da-z\\.-]+)\\.([a-z\\.]{2,6})$',
    'g'
  );
  return pattern.test(str);
};

const validateEmail: Validator = (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error('邮箱不能为空'));
  } else if (!isLegalEmail(value)) {
    callback(new Error('请输入合法的邮箱'));
  } else {
    callback();
  }
};

export interface Validators {
  [propsName: string]: Validator;
}

export default {
  validateEmail
};
