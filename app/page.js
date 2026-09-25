"use client"
import Image from "next/image";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";






const Home = () => {

  const { data: session, status } = useSession();
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden">

        {/* Background Glow */}
        <div className="absolute left-1/2 top-0 -z-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-purple-600/20 blur-[120px]" />

        <div className="mx-auto max-w-7xl px-6 py-24 text-center md:py-32">

          {/* Small Badge */}
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
            <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse"></span>
            Simple. Fast. Powerful.
          </div>

          {/* Heading */}
          <h1 className="mx-auto max-w-4xl text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl md:text-7xl">
            Turn Long URLs Into
            <span className="block bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
              Short Links
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            BitLinks makes your long and complicated URLs short, clean,
            and easy to share. Create memorable links in seconds.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

            <Link
              href={status === "authenticated" ? "/shortner" : "/login"}
              className="group rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-7 py-3.5 font-bold text-white shadow-xl shadow-purple-500/20 transition duration-300 hover:-translate-y-1 hover:shadow-purple-500/40"
            >
              Get Started
              <span className="ml-2 transition group-hover:ml-3">
                →
              </span>
            </Link>

            <a
              href="#how-it-works"
              className="rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 font-semibold text-gray-300 transition hover:bg-white/10 hover:text-white"
            >
              Learn More
            </a>

          </div>

          {/* ================= URL DEMO ================= */}
          <div className="mx-auto mt-20 max-w-3xl">

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 shadow-2xl backdrop-blur-xl">

              {/* Fake Browser Header */}
              <div className="mb-4 flex items-center gap-2 border-b border-white/10 px-3 pb-4">
                <span className="h-3 w-3 rounded-full bg-red-400"></span>
                <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
                <span className="h-3 w-3 rounded-full bg-green-400"></span>

                <div className="ml-3 flex-1 rounded-lg bg-black/30 px-4 py-2 text-left text-sm text-gray-500">
                  bitlinks.com
                </div>
              </div>

              {/* URL Example */}
              <div className="grid gap-4 p-5 md:grid-cols-[1fr_auto_1fr] md:items-center">

                <div className="rounded-xl border border-white/10 bg-slate-900 p-4 text-left">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500">
                    Long URL
                  </p>

                  <p className="truncate text-sm text-gray-300">
                    https://www.google.com/search?q=bitlinks
                  </p>
                </div>

                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10 text-xl text-purple-400">
                  →
                </div>

                <div className="rounded-xl border border-purple-500/20 bg-purple-500/10 p-4 text-left">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-purple-300">
                    Short Link
                  </p>

                  <p className="text-lg font-bold text-white">
                    bitlinks.com/gm
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section
        id="how-it-works"
        className="border-t border-white/5 bg-slate-900/40"
      >
        <div className="mx-auto max-w-7xl px-6 py-24">

          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
              How It Works
            </p>

            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Shorten your URL in 3 simple steps
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-400">
              No complicated setup. Just paste your URL, choose a short name,
              and share it.
            </p>
          </div>


          <div className="mt-14 grid gap-6 md:grid-cols-3">

            {/* Step 1 */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:-translate-y-2 hover:border-purple-500/30">

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-xl font-bold text-purple-400">
                01
              </div>

              <h3 className="text-xl font-bold">
                Paste your URL
              </h3>

              <p className="mt-3 leading-7 text-gray-400">
                Enter any long URL that you want to make shorter and easier
                to share.
              </p>

            </div>


            {/* Step 2 */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:-translate-y-2 hover:border-blue-500/30">

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-xl font-bold text-blue-400">
                02
              </div>

              <h3 className="text-xl font-bold">
                Choose a name
              </h3>

              <p className="mt-3 leading-7 text-gray-400">
                Give your link a short and memorable name like
                <span className="font-semibold text-purple-400"> /gm </span>
                instead of a long URL.
              </p>

            </div>


            {/* Step 3 */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:-translate-y-2 hover:border-indigo-500/30">

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-xl font-bold text-indigo-400">
                03
              </div>

              <h3 className="text-xl font-bold">
                Share your link
              </h3>

              <p className="mt-3 leading-7 text-gray-400">
                Share your clean and short BitLinks URL anywhere you want.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* ================= FEATURES ================= */}
      <section className="mx-auto max-w-7xl px-6 py-24">

        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
            <div className="text-3xl">⚡</div>

            <h3 className="mt-5 text-xl font-bold">
              Lightning Fast
            </h3>

            <p className="mt-3 text-gray-400">
              Create short links quickly and share them instantly.
            </p>
          </div>


          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
            <div className="text-3xl">🔗</div>

            <h3 className="mt-5 text-xl font-bold">
              Easy to Remember
            </h3>

            <p className="mt-3 text-gray-400">
              Replace long URLs with simple names that people can remember.
            </p>
          </div>


          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
            <div className="text-3xl">🚀</div>

            <h3 className="mt-5 text-xl font-bold">
              Easy to Share
            </h3>

            <p className="mt-3 text-gray-400">
              Share your short BitLinks anywhere — social media, messages,
              websites, and more.
            </p>
          </div>

        </div>

      </section>


      {/* ================= FINAL CTA ================= */}
      <section className="px-6 pb-24">

        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-600/20 via-indigo-600/10 to-blue-600/20 px-6 py-16 text-center">

          <h2 className="text-3xl font-bold md:text-5xl">
            Ready to shorten your links?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-gray-400">
            Start creating clean, memorable URLs with BitLinks today.
          </p>

          <Link
            href={status === "authenticated" ? "/shortner" : "/login"}
            className="mt-8 inline-block rounded-xl bg-white px-7 py-3.5 font-bold text-slate-950 transition hover:-translate-y-1 hover:bg-gray-100"
          >
            Get Started →
          </Link>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 bg-slate-950">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">

          <div className="flex items-center gap-2">

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
              🔗
            </div>

            <span className="text-lg font-bold">
              <span className="text-white">Bit</span>
              <span className="text-purple-400">Links</span>
            </span>

          </div>

          <p className="text-sm text-gray-500">
            © 2026 BitLinks. All rights reserved.
          </p>

          <p className="text-sm text-gray-500">
            Made with ❤️ by{" "}
            <span className="font-semibold text-purple-400">
              Aryan TKR
            </span>
          </p>

        </div>

      </footer>

    </main>
  );
};

export default Home;

