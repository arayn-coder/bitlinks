
"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
const About = () => {

    const { data: session, status } = useSession();
  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative px-6 pt-20 pb-24">

        {/* Background Glow */}
        <div className="absolute left-1/2 top-0 -z-0 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-6xl text-center">

          {/* Small Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
            Simple. Fast. Memorable.
          </div>

          <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Turn Long URLs Into
            <span className="block bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Short, Powerful Links
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-400">
            BitLinks is a simple URL shortening platform that helps you
            transform long and complicated URLs into clean, memorable and
            shareable links.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

            <Link
                 href={status === "authenticated" ? "/shortner" : "/login"}
              className="rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-7 py-3.5 font-semibold shadow-lg shadow-blue-500/20 transition hover:-translate-y-1 hover:shadow-blue-500/40"
            >
              Create Your Link →
            </Link>

            <Link
              href="/"
              className="rounded-xl border border-slate-700 bg-slate-900 px-7 py-3.5 font-semibold text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white"
            >
              Back to Home
            </Link>

          </div>

        </div>
      </section>


      {/* ================= WHAT IS BITLINKS ================= */}
      <section className="border-y border-slate-800/70 bg-slate-900/30 px-6 py-20">

        <div className="mx-auto max-w-6xl">

          <div className="grid items-center gap-12 lg:grid-cols-2">

            {/* Left */}
            <div>

              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-400">
                What is BitLinks?
              </p>

              <h2 className="text-3xl font-bold sm:text-4xl">
                A smarter way to share links.
              </h2>

              <p className="mt-6 leading-8 text-slate-400">
                Long URLs can be difficult to remember, share and manage.
                BitLinks solves this problem by allowing you to create a
                customized short link from your original URL.
              </p>

              <p className="mt-4 leading-8 text-slate-400">
                Instead of sharing a long address, you can create something
                simple such as:
              </p>

              {/* Example */}
              <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-5">

                <p className="text-sm text-slate-500">
                  Original URL
                </p>

                <p className="mt-2 break-all text-sm text-slate-400">
                  https://example.com/my/very/long/url/that/is/hard/to/share
                </p>

                <div className="my-5 h-px bg-slate-800" />

                <p className="text-sm text-slate-500">
                  Your BitLink
                </p>

                <p className="mt-2 text-lg font-semibold text-blue-400">
                  bitlinks/my-awesome-link
                </p>

              </div>

            </div>


            {/* Right - Visual */}
            <div className="relative">

              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-2xl" />

              <div className="relative rounded-3xl border border-slate-800 bg-slate-950 p-7 shadow-2xl">

                <div className="mb-6 flex items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 text-xl">
                    🔗
                  </div>

                  <div>
                    <p className="font-semibold">
                      Your Short Link
                    </p>

                    <p className="text-xs text-slate-500">
                      Ready to share
                    </p>
                  </div>

                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">

                  <p className="text-sm text-slate-500">
                    Short URL
                  </p>

                  <p className="mt-2 font-mono text-blue-400">
                    bitlinks/portfolio
                  </p>

                </div>

                <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-4">

                  <p className="text-sm text-slate-500">
                    Destination
                  </p>

                  <p className="mt-2 truncate text-sm text-slate-400">
                    https://yourwebsite.com/my-portfolio
                  </p>

                </div>

                <div className="mt-5 flex items-center justify-between">

                  <span className="text-xs text-green-400">
                    ● Active Link
                  </span>

                  <button className="rounded-lg border border-slate-700 px-4 py-2 text-xs text-slate-300">
                    Copy Link
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section className="px-6 py-24">

        <div className="mx-auto max-w-6xl">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
              How It Works
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Three steps. One simple link.
            </h2>

            <p className="mt-4 text-slate-400">
              Creating and sharing a short URL with BitLinks takes only a
              few seconds.
            </p>

          </div>


          <div className="mt-14 grid gap-6 md:grid-cols-3">

            {/* Step 1 */}
            <div className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-7 transition duration-300 hover:-translate-y-2 hover:border-purple-500/40">

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 text-2xl text-purple-400">
                01
              </div>

              <h3 className="text-xl font-bold">
                Enter Your URL
              </h3>

              <p className="mt-3 leading-7 text-slate-500">
                Paste the long URL that you want to make shorter.
              </p>

            </div>


            {/* Step 2 */}
            <div className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-7 transition duration-300 hover:-translate-y-2 hover:border-blue-500/40">

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl text-blue-400">
                02
              </div>

              <h3 className="text-xl font-bold">
                Customize Your Link
              </h3>

              <p className="mt-3 leading-7 text-slate-500">
                Choose a memorable custom name for your short URL.
              </p>

            </div>


            {/* Step 3 */}
            <div className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-7 transition duration-300 hover:-translate-y-2 hover:border-cyan-500/40">

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-2xl text-cyan-400">
                03
              </div>

              <h3 className="text-xl font-bold">
                Share & Redirect
              </h3>

              <p className="mt-3 leading-7 text-slate-500">
                Share your short link. When someone opens it, BitLinks
                redirects them to the original URL.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}
      <section className="border-y border-slate-800/70 bg-slate-900/30 px-6 py-24">

        <div className="mx-auto max-w-6xl">

          <div className="text-center">

            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Features
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Everything you need for your links
            </h2>

          </div>


          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {/* Feature */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 transition hover:border-purple-500/30">

              <div className="mb-5 text-3xl">
                ⚡
              </div>

              <h3 className="text-lg font-bold">
                Fast URL Shortening
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Quickly transform long URLs into short and easy-to-share
                links.
              </p>

            </div>


            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 transition hover:border-blue-500/30">

              <div className="mb-5 text-3xl">
                ✨
              </div>

              <h3 className="text-lg font-bold">
                Custom Short Links
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Create memorable short URLs using your own custom slug.
              </p>

            </div>


            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 transition hover:border-cyan-500/30">

              <div className="mb-5 text-3xl">
                👤
              </div>

              <h3 className="text-lg font-bold">
                Personal URL Management
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Logged-in users can view and manage the short URLs they
                have created.
              </p>

            </div>


            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 transition hover:border-purple-500/30">

              <div className="mb-5 text-3xl">
                🔐
              </div>

              <h3 className="text-lg font-bold">
                User Authentication
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Your URL creation area is protected so users can manage
                their own links.
              </p>

            </div>


            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 transition hover:border-blue-500/30">

              <div className="mb-5 text-3xl">
                🔗
              </div>

              <h3 className="text-lg font-bold">
                Instant Redirects
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Every short link can resolve to its original destination
                through the dynamic short-link route.
              </p>

            </div>


            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 transition hover:border-cyan-500/30">

              <div className="mb-5 text-3xl">
                📋
              </div>

              <h3 className="text-lg font-bold">
                Easy Copy & Share
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Copy your generated links instantly and share them
                wherever you need.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= TECHNOLOGY ================= */}
      <section className="px-6 py-24">

        <div className="mx-auto max-w-5xl text-center">

          <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
            Built With Modern Technology
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Simple architecture. Powerful experience.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-400">
            BitLinks combines a modern Next.js frontend with authentication
            and MongoDB storage to create a smooth URL shortening experience.
          </p>


          <div className="mt-12 flex flex-wrap justify-center gap-4">

            <div className="rounded-xl border border-slate-800 bg-slate-900 px-6 py-4">
              <span className="font-semibold">Next.js</span>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 px-6 py-4">
              <span className="font-semibold">Tailwind CSS</span>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 px-6 py-4">
              <span className="font-semibold">MongoDB</span>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 px-6 py-4">
              <span className="font-semibold">NextAuth</span>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 px-6 py-4">
              <span className="font-semibold">JavaScript</span>
            </div>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}
      <section className="px-6 pb-24">

        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-purple-600/20 via-slate-900 to-blue-600/20 p-10 text-center sm:p-16">

          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="relative">

            <div className="mb-5 text-4xl">
              🚀
            </div>

            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to shorten your first URL?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Create a clean, memorable link and start sharing it in
              seconds.
            </p>

            <Link
              href="/shortner"
              className="mt-8 inline-flex rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-7 py-3.5 font-semibold shadow-lg shadow-blue-500/20 transition hover:-translate-y-1"
            >
              Create Short URL →
            </Link>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-800/70 px-6 py-8">

        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">

          <p>
            © {new Date().getFullYear()} BitLinks. All rights reserved.
          </p>

          <p>
            Make your links shorter. Make them memorable. 🚀
          </p>

        </div>

      </footer>

    </main>
  );
};

export default About;

