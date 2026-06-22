export const logout = async () => {
  const res = await fetch(
    "/server/validators/logout.php", {
      method: "GET",
      credentials: "include"
    }
  );
  const text = await res.text();

  window.location.href = "/login";
}


const LogOut = () => {

  return (
    logout()
  );
};

export default LogOut;