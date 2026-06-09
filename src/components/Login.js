import "./css/login.css";

const Login = () => {
  const personalData = "Авторизуясь, вы подтверждаете согласие на хранение " +
    "и обработку персональных данных, включая паспортные сведения студента " +
    "и его родственников в соответствии с действующим законодательством " +
    "Российской Федерации";

  return (
    <div className={"login-cont"}>
      <h1>Вход</h1>
      <form action={"/"} method={"post"}>

        <label>Логин</label>
        <input type={"text"} name={"login"} placeholder={"username"}/>

        <label>Пароль</label>
        <input type={"password"} name={"pass"} placeholder={"Пароль"}/>

        <p className={"error-text"}></p>
        <button type={"submit"}>Войти</button>
      </form>
      <div className={"info-cont"}><p>Сайт запрашивает <a onClick={() => (alert(personalData))}>персональные данные</a></p></div>
    </div>
  );
};

export default Login;