"use client";

import {
  faShapes,
  faChartLine,
  faNewspaper,
  faRightLeft,
  faBell,
  faUsers,
  faGear,
  faLifeRing,
  faEnvelope,
  faArrowRightFromBracket,
  faBarsStaggered,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useEffect, useState } from "react";

const itemClass =
  "flex items-center gap-2 hover:text-zinc-700 hover:scale-105 duration-300";

function Sidebar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Mobile button */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-5 left-4 z-1000 p-2 rounded-md"
        aria-label="Open menu"
      >
        <FontAwesomeIcon icon={faBarsStaggered} />
      </button>

      {/* Backdrop (mobile only) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="lg:hidden fixed inset-0 z-1000 bg-black/40"
        />
      )}

      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-1050 h-screen
          w-72 lg:w-72 shrink-0
          bg-white/70 dark:bg-black/60 backdrop-blur-2xl
          border-r border-zinc-200 dark:border-zinc-800
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <h2 className="font-semibold">Cryptal</h2>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="lg:hidden p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900"
            aria-label="Close menu"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div className="px-4 pb-6 h-[calc(100vh-64px)] overflow-y-auto">
          <div className="flex flex-col gap-3">
            <p className="text-zinc-500 text-sm">Overview</p>
            <ul className="flex flex-col gap-3">
              <li className={itemClass}>
                <FontAwesomeIcon icon={faShapes} />
                <Link
                  href="/"
                  className="text-base"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
              </li>

              <li className={itemClass}>
                <FontAwesomeIcon icon={faChartLine} />
                <Link
                  href="/market"
                  className="text-base"
                  onClick={() => setOpen(false)}
                >
                  Market
                </Link>
              </li>

              <li className={itemClass}>
                <FontAwesomeIcon icon={faNewspaper} />
                <Link
                  href="/news"
                  className="text-base"
                  onClick={() => setOpen(false)}
                >
                  News
                </Link>
              </li>

              <li className={itemClass}>
                <FontAwesomeIcon icon={faRightLeft} />
                <Link
                  href="#"
                  className="text-base line-through"
                  onClick={() => setOpen(false)}
                >
                  Exchange
                </Link>
              </li>
            </ul>
          </div>

          <hr className="my-6 border-zinc-200 dark:border-zinc-800" />

          <div className="flex flex-col gap-3">
            <p className="text-zinc-500 text-sm">Account</p>
            <ul className="flex flex-col gap-3">
              <li className={itemClass}>
                <FontAwesomeIcon icon={faBell} />
                <Link
                  href="#"
                  className="text-base line-through"
                  onClick={() => setOpen(false)}
                >
                  Notifications
                </Link>
              </li>

              <li className={itemClass}>
                <FontAwesomeIcon icon={faUsers} />
                <Link
                  href="#"
                  className="text-base line-through"
                  onClick={() => setOpen(false)}
                >
                  Community
                </Link>
              </li>

              <li className={itemClass}>
                <FontAwesomeIcon icon={faGear} />
                <Link
                  href="#"
                  className="text-base line-through"
                  onClick={() => setOpen(false)}
                >
                  Settings
                </Link>
              </li>
            </ul>
          </div>

          <hr className="my-6 border-zinc-200 dark:border-zinc-800" />

          <ul className="flex flex-col gap-3">
            <li className={itemClass}>
              <FontAwesomeIcon icon={faLifeRing} />
              <Link
                href="/support"
                className="text-base"
                onClick={() => setOpen(false)}
              >
                Support
              </Link>
            </li>

            <li className={itemClass}>
              <FontAwesomeIcon icon={faEnvelope} />
              <Link
                href="#"
                className="text-base line-through"
                onClick={() => setOpen(false)}
              >
                Messages
              </Link>
            </li>

            <li className={`${itemClass} text-red-500`}>
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
              <Link
                href="#"
                className="text-base line-through"
                onClick={() => setOpen(false)}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
