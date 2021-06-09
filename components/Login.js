import { signIn } from "next-auth/client";
import Image from "next/image";

const Login = () => {
  return (
    <div className="mt-5 grid place-items-center">
      <div>
        <Image
          src="https://links.papareact.com/5me"
          width={200}
          height={200}
          objectFit="contain"
        />
      </div>
      <h1
        onClick={signIn}
        className="rounded-full text-white text-center p-5 bg-blue-500 cursor-pointer mt-4 "
      >
        Login with Facebook
      </h1>
    </div>
  );
};

export default Login;
