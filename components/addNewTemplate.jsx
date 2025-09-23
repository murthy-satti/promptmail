"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddNewTemplate({ email }) {
  const [showForm, setShowForm] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    title: "",
    slug: "",
    image: "",
    subject: "",
    body: "",
  });

  const router = useRouter()

  const availableImages = [
    "about.webp",
    "aplogy.webp",
    "blankemail.png",
    "intro.png",
    "jobemail.png",
    "resignation.png",
    "sickemail.png",
  ];

  // Function to generate slug automatically
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // remove special chars
      .replace(/\s+/g, "-"); // replace spaces with dashes
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setNewTemplate({ ...newTemplate, image: localUrl });
    }
  };

  const handleAddTemplate = async () => {
    if (!newTemplate.title || !newTemplate.subject || !newTemplate.body) {
      setErrorMsg(true); // only set error if validation fails
      return;
    }
    setErrorMsg(false); // clear error before API call

    try {
      const res = await fetch(`/api/combinedRoute?email=${email}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          template: { ...newTemplate, slug: generateSlug(newTemplate.title) },
        }),
      });

      const result = await res.json();
      // console.log(result);

      if (!res.ok) throw new Error(result.message || "Failed to add template");

      toast.success("Template added successfully");
      setNewTemplate({
        title: "",
        slug: "",
        image: "",
        subject: "",
        body: "",
      });
      setShowForm(false);

      router.refresh();// ← triggers TemplateLibraryServer to fetch fresh data
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <>
      {/* Add New Template Card */}
      <div
        onClick={() => setShowForm(true)}
        className="m-2 p-2 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-blue-500 text-blue-600 dark:text-blue-400 cursor-pointer  dark:bg-gray-900 transition "
      >
        <Plus className="w-6 md:w-10 md:h-10 h-6" />
        <span className="mt-2 font-medium text-sm md:text-xl">Add New Template</span>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 overflow-hidden bg-black/50 dark:bg-white/20 flex md:justify-center md:items-center justify-center items-start pt-20  z-50 ">

          <div className="bg-white dark:bg-gray-900 px-2 md:px-6 py-3 rounded-xl max-w-7xl w-full mx-2 md:mx-auto space-y-4 shadow-xl max-h-[95vh] md:max-h-[90vh] overflow-y-auto pb-15">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Add New Template
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {/* Title + Subject */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Title :
                  </label>
                  <input
                    type="text"
                    value={newTemplate.title}
                    onChange={(e) =>
                      setNewTemplate({
                        ...newTemplate,
                        title: e.target.value,
                        slug: generateSlug(e.target.value), // auto set slug
                      })
                    }
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                    placeholder="e.g.. Job Application email"
                  />
                  {errorMsg && !newTemplate.title && (
                    <p className="text-red-500 text-xs md:text-sm mt-1">Please fill out this field</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Subject :
                  </label>
                  <input
                    type="text"
                    value={newTemplate.subject}
                    onChange={(e) =>
                      setNewTemplate({
                        ...newTemplate,
                        subject: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                    placeholder="e.g.. Application for fullstack developer job role"
                  />
                  {errorMsg && !newTemplate.subject && (
                    <p className="text-red-500 text-xs md:text-sm mt-1">Please fill out this field</p>
                  )}
                </div>
              </div>

              {/* Image Selection */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Thumbnail Image :
                </label>

                {/* Always single-line scrollable thumbnails */}
                <div className="scrollable-horizontal flex gap-3 overflow-x-auto pb-2">
                  {availableImages.map((img) => (
                    <div
                      key={img}
                      onClick={() =>
                        setNewTemplate({ ...newTemplate, image: `/${img}` })
                      }
                      className={`flex-shrink-0 w-40 md:w-45 cursor-pointer border rounded-lg overflow-hidden transition
        ${newTemplate.image === `/${img}`
                          ? "border-blue-500 ring-2 ring-blue-600"
                          : "border-gray-300"
                        }`}
                    >
                      <Image
                        src={`/${img}`}
                        alt={img}
                        width={96}
                        height={80}
                        className="w-full h-20 md:h-25 object-cover rounded-md"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Body */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Body :
                </label>
                <textarea
                  value={newTemplate.body}
                  onChange={(e) =>
                    setNewTemplate({ ...newTemplate, body: e.target.value })
                  }
                  className="w-full p-3 border rounded-md min-h-[45vh] md:min-h-[40vh] resize-y dark:bg-gray-800 dark:border-gray-700"
                  placeholder="Enter the message of the email"
                />
                {errorMsg && !newTemplate.body && (
                  <p className="text-red-500 text-xs md:text-sm mt-1">Please fill out this field</p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowForm(false);
                  setErrorMsg(false);
                }}
                className="px-4 py-2 bg-gray-400 dark:bg-gray-700 text-white rounded-md hover:bg-gray-600 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTemplate}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
          
        </div>
      )}
    </>
  );
}
