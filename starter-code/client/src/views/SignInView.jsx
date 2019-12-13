import React, { Component } from "react";

import { signIn as signInService } from "./../services/auth";

class SignInView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  async handleFormSubmission(event) {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      const user = await signInService({ email, password });
      this.props.changeAuthenticationStatus(user);
      this.props.history.push(`/`);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <main>
        <form onSubmit={this.handleFormSubmission}>
          <label>Email:</label> <br />
          <input
            type='email'
            placeholder='Email'
            value={this.state.email}
            name='email'
            onChange={this.handleInputChange}
          />{" "}
          <br />
          <label>Password:</label> <br />
          <input
            type='password'
            placeholder='Password'
            value={this.state.password}
            name='password'
            onChange={this.handleInputChange}
          />{" "}
          <br />
          <button>Sign In</button>
        </form>
      </main>
    );
  }
}

export default SignInView;
