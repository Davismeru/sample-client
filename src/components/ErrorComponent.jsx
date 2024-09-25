import { useContext } from "react";
import { TbFaceIdError } from "react-icons/tb";
import { Link } from "react-router-dom";
import { AuthContext } from "../assets/constants";
function ErrorComponent() {
  const { errorMessage } = useContext(AuthContext);
  return (
    <div className="text-2xl text-center p-5 h-screen flex flex-col gap-5 items-center justify-center text-red-600">
      <TbFaceIdError className="text-7xl" />
      {errorMessage + "!!!"}
      <Link to="/signin" className="text-blue-500">
        Sign in
      </Link>
    </div>
  );
}

export default ErrorComponent;
