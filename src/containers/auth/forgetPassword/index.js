import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onSubmit } from '../../../actions/auth/forgetPasswordAction';
import validate from '../../../util/validation';

class ForgetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailError: null
        }

        this.validateForm = this.validateForm.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { forgetPassword } = this.props;
        if (nextProps && nextProps.forgetPassword !== forgetPassword && nextProps.forgetPassword.data) {
        }
    }

    render() {
        let { email, emailError } = this.state;
        let { forgetPassword } = this.props;
        return (
            <div className="w-100 flex-fill d-flex flex-column justify-content-center">
                {(!forgetPassword.data && !forgetPassword.error) ? <div>
                    {forgetPassword.error && <div>{forgetPassword.data}</div>}
                    <div className="form-group w-100 mb-4 login-form-group">
                        <label htmlFor="userName" className="sr-only">Email</label>
                        <input id="userName" type="email" aria-describedby="userNameDesc"
                            placeholder="Email"
                            className="form-control"
                            onBlur={this.validateForm}
                            onChange={this.onChange}
                            name="email"
                            value={email} />
                        {emailError && <small className="form-element-hint text-danger">{emailError}</small>}
                    </div>
                    <button className="btn btn-lg btn-light w-100 mt-4" onClick={this.onFormSubmit}>Submit</button>
                </div> : <div> A reset password link has been sent to your email. kindly check your email.</div>}
            </div>
        )
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    validateForm(e) {
        this.validateFpForm(e.target.value);
    }

    validateFpForm = (value) => {
        if (!value) {
            this.setState({ emailError: 'email is required.' });
            return;
        }
        let isValid = validate.email(value);
        if (!isValid) {
            this.setState({ emailError: 'enter valid email.' });
            return;
        }
        this.setState({ emailError: null });
        return;
    }

    onFormSubmit(e) {
        e.preventDefault();
        const { email } = this.state;
        if (!email) {
            this.validateFpForm('email', email);
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
    forgetPassword: state.forgetPassword
})

const mapDispatchToProps = dispatch => bindActionCreators({
    onSubmit
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgetPassword)