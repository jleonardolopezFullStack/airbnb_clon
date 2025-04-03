"use client";

import { signIn } from "next-auth/react";

const page = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-slate-300 p-10 text-center">
        <h1>Login con Github</h1>

        <button
          className="bg-blue-500 border-collapse hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded-full"
          onClick={async () => {
            const result = await signIn("github", {
              callbackUrl: "/properties",
              redirect: false,
            });

            console.log(result);
          }}
        >
          Acceder con Github
        </button>

        <button
          className="bg-green-500 border-collapse hover:bg-green-700 text-white font-bold py-2 px-4 m-4 rounded-full"
          onClick={async () => {
            const result = await signIn("google", {
              callbackUrl: "/properties",
              redirect: false,
            });

            console.log(result);
          }}
        >
          Acceder con Google
        </button>
      </div>
    </div>
  );
};

export default page;
