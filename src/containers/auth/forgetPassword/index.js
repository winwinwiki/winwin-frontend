import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    onSubmit,
    validateFpForm
} from '../../../actions/auth/forgetPasswordAction';


class ForgetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email : ''
        }

        this.validateForm = this.validateForm.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    render() {
        let {email} = this.state;
        let {isFpPending, isFpSuccess, fpError, fpFormError} = this.props;
        return (
                <div className="w-100 flex-fill d-flex flex-column justify-content-center">
                   { !isFpSuccess ? <div>
                        { fpError && <div>{fpError.message}</div> }
                        <div className="form-group w-100 mb-4 login-form-group">
                        <label htmlFor="userName" className="sr-only">Email</label>
                        <input id="userName" type="email" aria-describedby="userNameDesc" 
                                placeholder="Email" 
                                className="form-control"
                                onBlur={this.validateForm} 
                                onChange={this.onChange} 
                                name="email" 
                                value={email} />
                        <small id="userNameDesc" className="sr-only">Email</small>
                        { fpFormError.email && <div>{fpFormError.email}</div> }
                        </div>
                        <button className="btn btn-lg btn-light w-100 mt-4" onClick={this.onFormSubmit}>Submit</button>
                    </div> : <div> A reset password link has been sent to your email. kindly check your email.</div>}
                </div>
        )
    }
    
    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    validateForm(e) {
        this.props.validateFpForm(e.target.value);
    }

    onFormSubmit(e) {
        e.preventDefault();
        const {email} = this.state;
        if(!email) { 
            this.props.validateFpForm('email', email);
            return;
        }
        this.props.onSubmit(this.state.email, () => {
            this.setState({
                email: ''
            });
        });
    }
}

const mapStateToProps = state => ({
    isFpSuccess: state.forgetPassword.isFpSuccess,
    isFpPending: state.forgetPassword.isFpPending,
    fpError: state.forgetPassword.fpError,
    fpFormError: state.forgetPassword.fpFormError
})

const mapDispatchToProps = dispatch => bindActionCreators({
    onSubmit,
    validateFpForm
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgetPassword)