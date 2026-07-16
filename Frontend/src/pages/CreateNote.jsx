import { Lock, Share2, Send } from "lucide-react";
import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext"
import NavBar from "../components/NavBar";

export default function CreateNote() {
  const [accessType, setAccessType] = useState("public");
  const [shareType, setShareType] = useState("one-time");
  const [expiryDate, setExpiryDate] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [showPopup, setShowPopup] = useState(false)
  const [shareData, setShareData] = useState(null)

  const buttonClass = (active) =>
    `flex-1 rounded-lg border py-2.5 font-medium transition
    ${active
      ? "bg-indigo-600 text-white border-indigo-600"
      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
    }`;

  const handleCreateNote = async () => {
    try {
      setError(null);

      if(!title || !content){
        return setError("All fields are required")
      }

      const { data } = await api.post("/notes", {
        user: user._id,
        title,
        content,
        accessType,
        shareType,
        expiryDate:
          shareType === "time-based"
            ? expiryDate
            : null,
      });

      setShareData(data);
      setShowPopup(true);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message
      );
    }
  };
  return (
    <>
    <NavBar />

      <div className="max-w-4xl mt-10 mx-auto rounded-2xl border border-gray-200 bg-white p-10 shadow-sm">
        {/* Header */}
        {
            error && <p className="text-red-500 mb-5">{error}</p>
          }
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Create New Note
          </h1>
          <p className="mt-2 text-gray-500">
            Draft your thoughts and choose how you want to share them securely.
          </p>
        </div>
        {/* Title */}
        <div className="mb-6">
          <label className="mb-2 block font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            placeholder="Give your note a clear subject..."
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        {/* Content */}
        <div className="mb-8">
          <label className="mb-2 block font-medium text-gray-700">
            Content
          </label>
          <textarea
            rows={8}
            placeholder="Start writing your note here..."
            className="w-full resize-none rounded-xl border border-gray-300 p-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
        </div>
        {/* Options */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Access Type */}
          <div>
            <div className="mb-3 flex items-center gap-2 text-lg font-medium">
              <Lock size={20} />
              <span>Access Type</span>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                onClick={() => setAccessType("public")}
                className={buttonClass(accessType === "public")}
              >
                Public
              </button>
              <button
                type="submit"
                onClick={() => setAccessType("password")}
                className={buttonClass(accessType === "password")}
              >
                Password
              </button>
            </div>

          </div>
          {/* Share Type */}
          <div>
            <div className="mb-3 flex items-center gap-2 text-lg font-medium">
              <Share2 size={20} />
              <span>Share Type</span>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                onClick={() => setShareType("one-time")}
                className={buttonClass(shareType === "one-time")}
              >
                One-Time
              </button>
              <button
                type="submit"
                onClick={() => setShareType("time-based")}
                className={buttonClass(shareType === "time-based")}
              >
                Time-Based
              </button>
            </div>
            {shareType === "time-based" && (
              <input
                type="datetime-local" required
                className="mt-4 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            )}
          </div>
        </div>
        {/* Button */}
        <div className="mt-10 flex justify-end">
          <button className="flex items-center gap-3 rounded-xl bg-indigo-600 px-10 py-3 font-medium text-white transition hover:bg-indigo-700"
            type="submit"
            onClick={handleCreateNote}
          >
            Create Note
            <Send size={18} />
          </button>
        </div>
        {
          showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50">
              <div className="w-100 rounded-xl bg-white p-6 shadow-lg">
                <h2 className="text-xl font-semibold mb-4">
                  Note Created Successfully!
                </h2>

                <p className="mb-2">
                  <strong>Share Link:</strong>
                </p>

                <div className="rounded bg-gray-100 p-2 break-all">
                  {shareData?.shareLink}
                </div>

                <p className="mt-4 mb-2">
                  <strong>Access Key:</strong>
                </p>

                <div className="rounded bg-gray-100 p-2">
                  {shareData?.accessKey || "No password required"}
                </div>

                <button
                  className="mt-6 w-full rounded-lg bg-indigo-600 py-2 text-white"
                  onClick={() => setShowPopup(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )
        }
      </div>
    </>
  );
}