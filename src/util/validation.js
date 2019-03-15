export default {
  email: function(email) {
    // let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //let re = /^[a-zA-Z][a-zA-Z ]*$/;
    let re = /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/gim;
    return re.test(email);
  },
  password: function(pwd) {
    let regex = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return regex.test(pwd);
  },
  confirmPassword: function(pwd, cnfPwd) {
    return pwd === cnfPwd;
  },
  name: function(name) {
    let regx = /^[a-zA-Z][a-zA-Z ]*$/;
    return regx.test(name);
  },
  file: function(file) {
    let regx = /[.csv|.xlsx|.xls]+$/;
    return regx.test(file.name);
  },
  number: function(num) {
    let regx = /^[0-9]*$/;
    return regx.test(num);
  },
  image: function(file) {
    let regx = /\.(gif|jpg|jpeg|tiff|png)$/i;
    return regx.test(file);
  }
};
