import { bindActionCreators } from "redux";
import CreateUser from "./createUser";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { onCreateUser } from "../../actions/createUser/createUserAction";

const mapStateToProps = state => ({
  createUser: state.createUser
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: () => push("/users"),
      onCreateUser
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUser);
