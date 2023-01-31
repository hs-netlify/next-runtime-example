import React from "react";
import { Helmet } from "react-helmet";

const Login = () => {
  return (
    <>
      <Helmet>
        <script
          type="text/javascript"
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
        ></script>
      </Helmet>
      <div>
        <div data-netlify-identity-menu></div>
        <div data-netlify-identity-button>Login with Netlify Identity</div>
      </div>
    </>
  );
};

export default Login;
