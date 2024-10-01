import axios from "axios";

export function LogoutLink() {
  const handleClick = (event) => {
    event.preventDefault();
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    window.location.href = "/";
  };

  return (
    <>
    <span></span>
    <a href="#" onClick={handleClick}>
      Logout
    </a>
    </>
  );
}