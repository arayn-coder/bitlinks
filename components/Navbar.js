
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
    const { data: session, status } = useSession();
    const [showdropdown, setShowdropdown] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        await signOut({
            callbackUrl: "/login",
        });
    };

    return (

        <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                {/* ================= LOGO ================= */}
                <Link href="/" className="flex items-center gap-3">

                    {/* BitLinks Logo Icon */}
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 shadow-lg shadow-purple-500/30">

                        {/* Link Symbol */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-6 w-6 text-white"
                        >
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                        </svg>
                    </div>

                    {/* Logo Text */}
                    <div className="text-2xl font-extrabold tracking-tight">
                        <span className="text-white">Bit</span>
                        <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Links
                        </span>
                    </div>

                </Link>

                {/* ================= RIGHT SIDE ================= */}
                <div className="flex items-center gap-4">

                    {/* ================= NAV LINKS ================= */}
                    <ul className="hidden items-center gap-2 md:flex">

                        <li>
                            <Link
                                href="/"
                                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
                            >
                                Home
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/about"
                                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
                            >
                                About
                            </Link>
                        </li>

                        <li>
                            <Link
                                href={status === "authenticated" ? "/shortner" : "/login"}
                                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
                            >
                                Shortner
                            </Link>
                        </li>



                    </ul>

                    {/* ================= AUTH SECTION ================= */}
                    <div className="relative flex items-center gap-3">

                        {/* Loading */}
                        {status === "loading" && (
                            <span className="text-sm text-gray-300">
                                Loading...
                            </span>
                        )}

                        {/* ================= LOGGED IN ================= */}
                        {status === "authenticated" && session && (
                            <>

                                {/* User Dropdown Button */}
                                <button
                                    onClick={() => setShowdropdown(!showdropdown)}
                                    onBlur={() => {
                                        setTimeout(() => {
                                            setShowdropdown(false)
                                        }, 100)
                                    }}
                                    className="text-white mx-2 cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center"
                                    type="button"
                                >
                                    <span className="max-w-[180px] truncate">
                                        {session.user?.email}
                                    </span>

                                    <svg
                                        className="ms-3 h-2.5 w-2.5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 10 6"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 4 4 4-4"
                                        />
                                    </svg>
                                </button>

                                {/* ================= DROPDOWN ================= */}
                                {showdropdown && (
                                    <div className="absolute cursor-pointer left-6 top-12 z-50 w-48 divide-y divide-gray-100 rounded-lg bg-white shadow-lg dark:bg-gray-700">

                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">

                                            <li>
                                                <Link
                                                    href="/shortner"
                                                    onClick={() =>
                                                        setShowdropdown(false)
                                                    }
                                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Your Shortner
                                                </Link>
                                            </li>



                                            <li>
                                                <button
                                                    onClick={handleLogout}
                                                    className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Sign out
                                                </button>
                                            </li>

                                        </ul>
                                    </div>
                                )}

                                {/* Logout Button */}
                                <button
                                    onClick={handleLogout}
                                    className="hidden cursor-pointer rounded-xl bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-purple-500/20 transition hover:-translate-y-0.5 hover:shadow-purple-500/40 focus:outline-none focus:ring-4 focus:ring-blue-300 md:block"
                                >
                                    Logout
                                </button>

                            </>
                        )}

                        {/* ================= LOGGED OUT ================= */}
                        {status === "unauthenticated" && (
                            <div className="hidden items-center gap-3 md:flex">

                                {/* Github */}
                                <button
                                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-gray-200 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="h-5 w-5 fill-current"
                                    >
                                        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.7-3.87-1.54-3.87-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.25 3.32.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18a10.94 10.94 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.25 5.68.41.35.78 1.05.78 2.12v3.14c0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                                    </svg>

                                    Github
                                </button>

                                {/* Login */}
                                <Link
                                    href="/login"
                                    className="rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-500/25 transition duration-300 hover:-translate-y-0.5 hover:shadow-purple-500/40"
                                >
                                    Login
                                </Link>

                            </div>
                        )}

                        {/* ================= MOBILE BUTTON ================= */}
                        <button
                            onClick={() => setIsOpen(true)}
                            className="rounded-lg border border-white/10 bg-white/5 p-2 text-white md:hidden"
                            type="button"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>

                    </div>

                </div>
                {isOpen && (
                    <>
                        {/* Background overlay */}
                        <div
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-40sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl"
                        />

                        {/* Sidebar */}
                        <aside
                            className={`fixed right-0 top-0 z-50 h-full w-72 border-l border-white/10 bg-slate-950 p-6 shadow-2xl md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"
                                } transition-transform duration-300`}
                        >
                            {/* Sidebar header */}
                            <div className="mb-8 flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-bold text-white">
                                        Bitlinks
                                    </h2>
                                    <p className="text-xs text-slate-500">
                                        Short. Simple. Powerful.
                                    </p>
                                </div>

                                {/* Close button */}
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-lg border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
                                    aria-label="Close menu"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                            {/* Navigation */}
                            <nav className="space-y-2">

                                <Link
                                    href="/"
                                    onClick={() => setIsOpen(false)}
                                    className="block rounded-xl px-4 py-3 text-slate-300 transition hover:bg-blue-500/10 hover:text-blue-400"
                                >
                                    Home
                                </Link>

                                <Link
                                    href="/about"
                                    onClick={() => setIsOpen(false)}
                                    className="block rounded-xl px-4 py-3 text-slate-300 transition hover:bg-blue-500/10 hover:text-blue-400"
                                >
                                    About
                                </Link>

                                <Link
                                    href={status === "authenticated" ? "/shortner" : "/login"}
                                    onClick={() => setIsOpen(false)}
                                    className="block rounded-xl px-4 py-3 text-slate-300 transition hover:bg-blue-500/10 hover:text-blue-400"
                                >
                                    Shortener
                                </Link>

                              

                            </nav>

                           
                        </aside>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

