"use client";

import { useActionState, useEffect, useRef } from "react";
import action from "./action";

function Support() {
  const [state, dispatchAction, isPending] = useActionState(action, undefined);
  const emailRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    emailRef.current?.focus();
  }, [])


  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-xl py-10 rounded-2xl mx-auto flex flex-col items-center justify-center gap-10 shadow-2xl dark:shadow-zinc-900">
        <h1 className="font-bold">Contact Us</h1>
        <form
          action={dispatchAction}
          className="flex flex-col gap-5 w-full px-6"
        >
          <input
            name="email"
            type="text"
            className="w-full bg-white dark:bg-black rounded-xl border border-zinc-500 p-3"
            placeholder="Email Here"
            ref={emailRef}
          />
          <textarea
            name="message"
            className="w-full min-h-40 bg-white dark:bg-black rounded-xl border border-zinc-500 px-3 py-4"
            placeholder="Message Here"
          />

          <button
            type="submit"
            disabled={isPending}
            className="bg-black dark:bg-white text-white dark:text-black rounded-xl w-full sm:w-1/2 mx-auto px-4 py-3 cursor-pointer"
          >
            {isPending ? <p className="animate-spin">🌀</p> : "Send"}
          </button>

          {state && (
            <p
              className={
                state.status
                  ? `text-green-600 text-center mx-auto`
                  : `text-red-600 text-center mx-auto`
              }
            >
              {state.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Support;
