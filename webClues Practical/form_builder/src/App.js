import React, { Component } from "react";
import { Layout } from "antd";
import HOME from "./Screens/HOME";
import FORM from "./Screens/FORM";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: "home",
    };
  }

  changeScreen = (screen) => {
    this.setState({ screen });
  };

  render() {
    const { screen } = this.state;
    return (
      <Layout style={{ height: "100vh", width: "100vw" }}>
        {screen === "home" ? <HOME changeScreen={this.changeScreen} /> : <FORM changeScreen={this.changeScreen} />}
      </Layout>
    );
  }
}
