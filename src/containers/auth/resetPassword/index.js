import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    onResetPassword,
    validateResetPasswordForm
} from '../../../actions/auth/resetPasswordAction';


class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password : '',
            confirmPassword : ''
        }

        this.validateForm = this.validateForm.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    render() {
        let {confirmPassword, password} = this.state;
        let {isResetPwdPending, isResetPwdSuccess, resetPwdError, resetFormError} = this.props;
        return (
            <div className="w-100 flex-fill d-flex flex-column justify-content-center">

                { resetPwdError && <div>{resetPwdError.message}</div> }
                <div className="form-group w-100 mb-4 login-form-group">
                  <label htmlFor="userName" className="sr-only">Password</label>
                  <input id="userName" type="password" aria-describedby="userNameDesc" 
                        placeholder="Password" 
                        className="form-control"
                        onBlur={this.validateForm} 
                        onChange={this.onChange} 
                        name="password" 
                        value={password} />
                  <small id="userNameDesc" className="sr-only">Password</small>
                  { resetFormError.password && <div>{resetFormError.password}</div> }
                </div>
                <div className="form-group w-100 mb-4 login-form-group">
                  <label htmlFor="userPassword" className="sr-only">Confirm Password</label>
                  <input id="userPassword" type="password" aria-describedby="passwordDesc" 
                        placeholder="Confirm Password" 
                        className="form-control"
                        onBlur={this.validateForm} 
                        onChange={this.onChange} 
                        name="confirmPassword" 
                        value={confirmPassword}/>
                  <small id="passwordDesc" className="sr-only">confirmPassword</small>
                  { resetFormError.confirmPassword ? <div>{resetFormError.confirmPassword}</div> : <div>&nbsp;</div> }
                </div>
                    <button className="btn btn-lg btn-light w-100 mt-4" onClick={this.onSubmit}>Reset</button>
                </div>
        )
    }
    
    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    validateForm(e) {
        this.props.validateResetPasswordForm(e.target.name, e.target.value);
    }

    onSubmit(e) {
        e.preventDefault();
        const {confirmPassword, password} = this.state;
        if(!confirmPassword || !password) { 
            this.props.validateResetPasswordForm('confirmPassword', confirmPassword);
            this.props.validateResetPasswordForm('password', password);
            return;
        }
        this.props.onResetPassword(this.state, () => {
            if(this.props.isResetPwdSuccess) { 
                this.props.changePage();
                this.setState({
                    confirmPassword: '',
                    password: ''
                });
            }
        });
    }
}

const mapStateToProps = state => ({
    isResetPwdPending: state.resetPassword.isResetPwdPending,
    isResetPwdSuccess: state.resetPassword.isResetPwdSuccess,
    resetPwdError: state.resetPassword.resetPwdError,
    resetFormError: state.resetPassword.resetFormError
})

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/'),
    onResetPassword,
    validateResetPasswordForm
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPassword)