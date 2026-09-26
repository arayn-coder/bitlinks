
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
                                                    className="block cursor-pointer w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
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
                                <Link href={"https://github.com/arayn-coder"}>
                                    <button
                                        className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-gray-200 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="h-5 w-5 fill-current"
                                        >
                                            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.7-3.87-1.54-3.87-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.25 3.32.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18a10.94 10.94 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.25 5.68.41.35.78 1.05.78 2.12v3.14c0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                                        </svg>

                                        Github
                                    </button>
                                </Link>

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
                            className="group rounded-xl border border-blue-400/20 bg-slate-900 p-2.5 text-slate-200 shadow-lg shadow-blue-500/5 transition-all duration-300 hover:border-blue-400/40 hover:bg-slate-800 hover:text-blue-400 md:hidden"
                            type="button"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
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
                        {/* Background Overlay */}
                        <div
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
                        />

                        {/* Sidebar */}
                        <aside
                            className={`fixed right-0 top-0 z-50 flex h-full w-80 flex-col border-l border-blue-500/20 bg-slate-950 shadow-[-20px_0_60px_rgba(0,0,0,0.5)] md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"
                                } transition-transform duration-300 ease-out`}
                        >
                            {/* Background Glow */}
                            <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl" />

                            {/* Header */}
                            <div className="relative flex items-center justify-between border-b border-white/10 px-6 py-5">

                                <div className="flex items-center gap-3">

                                    {/* Bitlinks Logo */}
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-black text-white shadow-lg shadow-blue-500/20">
                                        B
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-bold tracking-tight text-white">
                                            Bitlinks
                                        </h2>

                                        <p className="text-[11px] font-medium tracking-wide text-slate-500">
                                            Short. Simple. Powerful.
                                        </p>
                                    </div>

                                </div>

                                {/* Close Button */}
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-xl border border-white/10 bg-slate-900 p-2.5 text-slate-400 transition-all duration-300 hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-400 hover:rotate-90"
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
                            <nav className="relative flex-1 px-4 py-6 bg-black/70 backdrop-blur-sm md:hidden">

                                <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
                                    Menu
                                </p>

                                <div className="space-y-2">

                                    {/* Home */}
                                    <Link
                                        href="/"
                                        onClick={() => setIsOpen(false)}
                                        className="group flex items-center gap-3 cusor-pointer rounded-xl border border-transparent bg-slate-900/60 px-4 py-3.5 text-sm font-medium text-slate-300 transition-all duration-300 hover:-translate-x-1 hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400 hover:shadow-lg hover:shadow-blue-500/5"
                                    >
                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-all duration-300 group-hover:bg-blue-500/15 group-hover:text-blue-400">
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
                                                    d="M3 12l9-9 9 9M5 10v10h14V10"
                                                />
                                            </svg>
                                        </span>

                                        <span>Home</span>

                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="ml-auto h-4 w-4 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </Link>

                                    {/* About */}
                                    <Link
                                        href="/about"
                                        onClick={() => setIsOpen(false)}
                                        className="group flex items-center gap-3 rounded-xl border border-transparent bg-slate-900/60 px-4 py-3.5 text-sm font-medium text-slate-300 transition-all duration-300 hover:-translate-x-1 hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400 hover:shadow-lg hover:shadow-blue-500/5"
                                    >
                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-all duration-300 group-hover:bg-blue-500/15 group-hover:text-blue-400">
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
                                                    d="M13 16h-1v-4h-1m1-4h.01M12 22a10 10 0 100-20 10 10 0 000 20z"
                                                />
                                            </svg>
                                        </span>

                                        <span>About</span>

                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="ml-auto h-4 w-4 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </Link>

                                    {/* Shortener */}
                                    <Link
                                        href={"/login"}
                                        onClick={() => setIsOpen(false)}
                                        className="group flex items-center gap-3 rounded-xl border border-transparent bg-slate-900/60 px-4 py-3.5 text-sm font-medium text-slate-300 transition-all duration-300 hover:-translate-x-1 hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400 hover:shadow-lg hover:shadow-blue-500/5"
                                    >
                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-all duration-300 group-hover:bg-blue-500/15 group-hover:text-blue-400">
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
                                                    d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5m7.5-7.5l1.5-1.5a4 4 0 015.656 5.656l-3 3a4 4 0 01-5.656 0"
                                                />
                                            </svg>
                                        </span>

                                        <span>Shortener</span>

                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="ml-auto h-4 w-4 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </Link>

                                </div>

                            </nav>

                            {/* Bottom Buttons */}
                            <div className="relative border-t border-white/10 p-5 bg-black/70 backdrop-blur-sm md:hidden">

                                <div className="grid grid-cols-2 gap-3">

                                    {/* Login */}
                                    <Link
                                        href="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="group flex items-center justify-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-3 text-sm font-semibold text-blue-400 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:bg-blue-500/20 hover:text-blue-300 hover:shadow-lg hover:shadow-blue-500/10"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 transition-transform duration-300 group-hover:scale-110"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3"
                                            />
                                        </svg>

                                        Login
                                    </Link>

                                    {/* GitHub */}
                                    <a
                                        href="https://github.com/arayn-coder"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm font-semibold text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-slate-800 hover:text-white hover:shadow-lg hover:shadow-black/20"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.11.79-.25.79-.56v-2.01c-3.2.7-3.87-1.54-3.87-1.54-.53-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.1 11.1 0 015.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.71 5.41-5.29 5.69.42.36.78 1.08.78 2.18v3.24c0 .31.21.68.8.56A11.52 11.52 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
                                        </svg>

                                        GitHub
                                    </a>

                                </div>

                                <p className="mt-4 text-center text-[10px] text-slate-600">
                                    © {new Date().getFullYear()} Bitlinks
                                </p>

                            </div>

                        </aside>
                    </>
                )}



            </div>
        </nav>
    );
};

export default Navbar;

