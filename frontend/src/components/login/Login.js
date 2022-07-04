import { useEffect, useRef, useContext } from "react";
import validator from "validator";
import { useHistory } from "react-router-dom";
import axios from "axios";
import withModal from "../common/Modal";
import SignUp from "../register/SignUp";
import Context from "../../context";

const Login = (props) => {
  const { toggleModal } = props;

  const { setUser, setIsLoading } = useContext(Context);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const history = useHistory();

  useEffect(() => {
    const authenticatedUser = JSON.parse(localStorage.getItem("auth"));
    if (authenticatedUser) {
      history.push("/");
    }
  }, [history]);

  const getInputs = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    return { email, password };
  };

  const isUserCredentialsValid = (email, password) => {
    return validator.isEmail(email) && password;
  };

  const signin = async (email, password) => {
    const url = "http://localhost:8080/login";
    return await axios.post(url, { email, password });
  };

  const login = async () => {
    const { email, password } = getInputs();
    if (isUserCredentialsValid(email, password)) {
      setIsLoading(true);
      const authenticatedUser = await signin(email, password);

      if (authenticatedUser) {
        localStorage.setItem("auth", JSON.stringify(authenticatedUser.data));
        setUser(authenticatedUser.data);
        setIsLoading(false);
        history.push("/");
      } else {
        alert("Fallo en el registro, por favor intentalo de nuevo");
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="login__container">
      <div className="login__welcome">
        <div className="login__logo">
          <img
            src="https://global-uploads.webflow.com/5f3108520188e7588ef687b1/620e82ff8680cd26532fff29_Logotipo%20HACK%20A%20BOSS_white%20100%20px.svg"
            alt="logo"
          />
        </div>
        <p>Mini Instagram Clone</p>
      </div>
      <div className="login__form-container">
        <div className="login__form">
          <input type="text" placeholder="Email" ref={emailRef} />
          <input type="password" placeholder="Contraseña" ref={passwordRef} />
          <button className="login__submit-btn" onClick={login}>
            Iniciar sesión
          </button>
          <span className="login__forgot-password">
            Olvidaste tu contraseña?
          </span>
          <span className="login__signup" onClick={() => toggleModal(true)}>
            Regístrate
          </span>
        </div>
      </div>
    </div>
  );
};

export default withModal(SignUp)(Login);
