"use client";

import Head from "next/head";
import { toast } from "react-toastify";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import * as authFetcher from "@/lib/fetchers/auth";
import { setAccessToken } from "@/lib/helpers/localStorage";

export default function Login() {
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });
  const formOptions = {
    resolver: yupResolver(validationSchema),
    mode: "onChange" as any,
  };

  const { register, handleSubmit, formState, getValues } = useForm(formOptions);
  const { errors } = formState;

  const { mutate: onSubmit } = useMutation({
    mutationFn: () => authFetcher.login(getValues()),
    onSuccess: (res) => {
      setAccessToken(res.accessToken);
      router.push("/");
    },
    onError: (error: any) => {
      toast.error(error);
    },
  });

  return (
    <>
      <Head>
        <title>Login System</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="bg-slate-200 text-center text-indigo-600">
        <div className="mx-auto flex h-screen flex-col items-center  justify-center px-6 py-8 lg:py-0">
          <div className="w-full rounded-lg bg-white shadow dark:border dark:border-indigo-700 dark:bg-indigo-800 sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-indigo-600 dark:text-white md:text-2xl">
                Sign in to your account
              </h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className=" space-y-4 md:space-y-6"
                action="#"
              >
                <div className="text-left">
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-indigo-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full rounded-lg border border-indigo-300 bg-indigo-50 p-2.5 text-indigo-900 focus:border-primary-600 focus:ring-primary-600 dark:border-indigo-600 dark:bg-indigo-700 dark:text-white dark:placeholder-indigo-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    placeholder="name@company.com"
                  />
                </div>
                <div className="text-left">
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-indigo-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    {...register("password")}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="block w-full rounded-lg border border-indigo-300 bg-indigo-50 p-2.5 text-indigo-900 focus:border-primary-600 focus:ring-primary-600 dark:border-indigo-600 dark:bg-indigo-700 dark:text-white dark:placeholder-indigo-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="focus:ring-3 h-4 w-4 rounded border border-indigo-300 bg-indigo-50 focus:ring-primary-300 dark:border-indigo-600 dark:bg-indigo-700 dark:ring-offset-indigo-800 dark:focus:ring-primary-600"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-indigo-500 dark:text-indigo-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-indigo-500 dark:text-indigo-400">
                  Don’t have an account yet?{" "}
                  <Link
                    href="/register"
                    className="font-medium text-indigo-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
