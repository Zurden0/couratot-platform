import "./css/login.css";

const handleSubmit = async (e) => {
  document.querySelector(".error-text").textContent = "";
  e.preventDefault();

  const formData = new FormData(e.target);

  const res = await fetch(
    "/server/controllers/authUser.php", {
      method: "POST",
      body: formData,
      credentials: "include"
    }
  );

  const text = await res.text();

  if (text === "OK") {
    window.location.href = "/";
  } else {
    document.querySelector(".error-text").textContent = text;
  }
};

const Login = () => {
  const personalData = "Авторизуясь, вы подтверждаете согласие на хранение " +
    "и обработку персональных данных, включая паспортные сведения студента " +
    "и его родственников в соответствии с действующим законодательством " +
    "Российской Федерации";

  return (
    <div className={"login-cont"}>
      <h1>Вход</h1>
      <form onSubmit={handleSubmit}>

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