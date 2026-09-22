"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Shortner = () => {
  const { data: session, status } = useSession();

  const [url, seturl] = useState("");
  const [shorturl, setshorturl] = useState("");
  const [generated, setGenerated] = useState("");
  const [editingId, setEditingId] = useState(null);
  const formRef = useRef(null);

  // 👇 Store user's URLs
  const [urls, setUrls] = useState([]);

  const handleEdit = (item) => {
    // Put existing data into the form
    seturl(item.url);
    setshorturl(item.shorturl);

    // Store which database document we are editing
    setEditingId(item._id);

    // Scroll to form
    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  };

  const handleSaveChanges = async () => {

    // Check for spaces
    if (/\s/.test(url) || /\s/.test(shorturl)) {
      toast.error("Spaces are not allowed!", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "light",
      });
      return;
    }

    try {
      const response = await fetch(`/api/urls/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url,
          shorturl: shorturl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error('Fail to update URL!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      // Update the card in the UI
      setUrls((prevUrls) =>
        prevUrls.map((item) =>
          item._id === editingId ? data.url : item
        )
      );

      // Clear form
      seturl("");
      setshorturl("");

      // Exit edit mode
      setEditingId(null);

      toast.success('URL was updated!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error('Somthing went wrong!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleDelete = async (id) => {
    let cfr = confirm("Are you sure to delet URL")
    if (cfr) {

      try {
        const response = await fetch(`/api/urls/${id}`, {
          method: "DELETE",
        });

        const data = await response.json();

        if (!response.ok) {
          toast.error('fail to delete url!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return;
        }

        // Remove deleted URL from the current UI
        setUrls((prevUrls) =>
          prevUrls.filter((item) => item._id !== id)
        );

        toast.warn('URL was deleted!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",

        });
      } catch (error) {
        toast.error('Somthing went wrong!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    };

  }


  // 👇 Fetch user's URLs
  const fetchUrls = async () => {
    try {
      const response = await fetch("/api/urls");

      const data = await response.json();

      if (response.ok) {
        setUrls(data.urls);
      } else {
      }
    } catch (error) {
    }
  };

  // 👇 Fetch when user is authenticated
  useEffect(() => {
    if (status === "authenticated") {
      fetchUrls();
    }
  }, [status]);

  const generate = async () => {

    if (/\s/.test(url) || /\s/.test(shorturl)) {
      toast.error("Spaces are not allowed!", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "light",
      });
      return;
    }

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url,
          shorturl: shorturl,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error('Somthing went wrong!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });;
        return;
      }

      const generatedUrl = `${window.location.origin}/${shorturl}`;

      setGenerated(generatedUrl);

      seturl("");
      setshorturl("");

      toast.success('url generate succesfully!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",

      });

      // 👇 Refresh user's URLs after creating new URL
      fetchUrls();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-10">
      <ToastContainer />
      <div className="mx-auto max-w-5xl">

        {/* Your existing header */}

        {/* Your existing shortener box */}

        <div
          ref={formRef}
          className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-900/80 p-6">

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Original URL
            </label>

            <input
              type="url"
              value={url}
              placeholder="https://example.com/your-very-long-url"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-4 px-4 text-white outline-none"
              onChange={(e) => seturl(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Customize your link
            </label>

            <div className="flex overflow-hidden rounded-xl border border-slate-700 bg-slate-950">

              <div className="flex items-center border-r border-slate-700 px-4 text-sm text-slate-500">
                bitlinks/
              </div>

              <input
                type="text"
                value={shorturl}
                placeholder="my-awesome-link"
                className="min-w-0 flex-1 bg-transparent px-4 py-4 text-white outline-none"
                onChange={(e) => setshorturl(e.target.value)}
              />

            </div>
          </div>

          <button
            onClick={editingId ? handleSaveChanges : generate}
            className="w-full cursor-pointer rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95"
          >
            {editingId ? "Save Changes" : "⚡Create Short URL"}
          </button>

        </div>


        {/* =============================== */}
        {/* YOUR URLS */}
        {/* =============================== */}

        <div className="mt-14">

          <div className="mb-6 flex items-end justify-between">

            <div>
              <h2 className="text-2xl font-bold">
                Your URLs
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage your recently created short links
              </p>
            </div>

            <div className="rounded-full bg-slate-900 px-4 py-2 text-sm text-slate-400">
              {urls.length} Links
            </div>

          </div>


          {/* =============================== */}
          {/* URL CARDS */}
          {/* =============================== */}

          <div className="space-y-4">

            {urls.length === 0 ? (

              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-10 text-center">

                <div className="mb-3 text-4xl">
                  🔗
                </div>

                <h3 className="font-semibold text-white">
                  No URLs yet
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Create your first short URL above.
                </p>

              </div>

            ) : (

              urls.map((item) => {

                const shortLink =
                  `${window.location.origin}/${item.shorturl}`;

                return (

                  <div
                    key={item._id}
                    className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition hover:border-blue-500/40 hover:bg-slate-900"
                  >

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                      <div className="min-w-0 flex-1">

                        <div className="mb-2 flex items-center gap-3">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-lg">
                            🔗
                          </div>

                          <div className="min-w-0">

                            <h3 className="truncate font-semibold text-white">
                              {item.shorturl}
                            </h3>

                            <p className="text-xs text-slate-500">
                              {item.createdAt
                                ? new Date(item.createdAt).toLocaleDateString()
                                : "Recently created"}
                            </p>

                          </div>

                        </div>


                        <div className="ml-13">

                          <p className="mb-1 break-all text-sm font-medium text-blue-400">

                            <code>
                              <Link
                                target="_blank"
                                href={`/${item.shorturl}`}
                              >
                                {shortLink}
                              </Link>
                            </code>

                          </p>

                          <p className="truncate text-xs text-slate-500">
                            {item.url}
                          </p>

                        </div>

                      </div>



                      <div className="flex items-center gap-6">
                        <div className="edit-del-btn flex items-center gap-3">
                          {/* Edit Button */}
                          <button
                            onClick={() => handleEdit(item)}
                            className="group flex items-center cursor-pointer gap-2 rounded-lg border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/20 active:scale-95"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.5-9.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 7.5-7.5z"
                              />
                            </svg>

                            Edit
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDelete(item._id)} className="group flex cursor-pointer items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-all duration-300 hover:-translate-y-1 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/20 active:scale-95"
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
                                strokeWidth={2}
                                d="M6 7h12M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m2 0v12a2 2 0 01-2 2H9a2 2 0 01-2-2V7m3 4v6m4-6v6"
                              />
                            </svg>

                            Delete
                          </button>
                        </div>

                        <div className="copy-btn">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(shortLink);
                              toast.success('URL copied!', {
                                position: "bottom-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: false,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light"

                              });
                            }}
                            className="group flex items-center justify-center rounded-lg border border-gray-700 bg-gray-800/60 p-2.5 text-gray-400 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400 hover:shadow-lg hover:shadow-blue-500/20 active:scale-90 cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="20"
                              height="20"
                              color="currentColor"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="transition-transform duration-300 group-hover:scale-110"
                            >
                              <path d="M7 11V9C7 5.70017 7 4.05025 8.02513 3.02513C9.05025 2 10.7002 2 14 2C17.2998 2 18.9497 2 19.9749 3.02513C21 4.05025 21 5.70017 21 9V11C21 14.2998 21 15.9497 19.9749 16.9749C18.9497 18 17.2998 18 14 18C10.7002 18 8.9497 17.9499 8.02513 16.9749C7 15.9499 7 14.2998 7 11Z" />
                              <path d="M3 6V15C3 18.2998 3 19.9497 4.02513 20.9749C5.05025 22 6.70017 22 10 22H17" />
                            </svg>
                          </button>

                        </div>

                      </div>




                    </div>

                  </div>

                );
              })

            )}

          </div>

        </div>


        <div className="mt-12 text-center">
          <p className="text-sm text-slate-600">
            Make your links shorter. Make them memorable. 🚀
          </p>
        </div>

      </div>
    </div>
  );
};

export default Shortner;