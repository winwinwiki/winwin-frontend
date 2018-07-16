export default {
    email: function(email) {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
    }
}