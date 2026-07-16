import api from "../services/api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SharedNote() {
  const { token } = useParams();

  const [error, setError] = useState(null);
  const [accessType, setAccessType] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchSharedNote = async () => {
      try {
        const { data } = await api.get(`/share/${token}`);

        setAccessType(data.accessType);

        // Automatically fetch public notes
        if (data.accessType === "public") {
          const response = await api.post(
            `/share/${token}/unlock`
          );

          setNote(response.data.note);
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load note."
        );
      }
    };

    fetchSharedNote();
  }, [token]);

  const getNote = async () => {
    try {
      setError(null);

      const { data } = await api.post(
        `/share/${token}/unlock`,
        { accessKey }
      );

      setNote(data.note);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid access key."
      );
    }
  };

  // Password Protected UI
  if (!note && accessType === "password") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-full max-w-md rounded-xl bg-white p-6 shadow">
          <h1 className="mb-4 text-2xl font-bold">
            Protected Note
          </h1>

          <input
            type="text"
            placeholder="Enter Access Key"
            className="w-full rounded-lg border p-3"
            value={accessKey}
            onChange={(e) =>
              setAccessKey(e.target.value)
            }
          />

          <button
            className="mt-4 w-full rounded-lg bg-indigo-600 py-3 text-white"
            onClick={getNote}
          >
            Unlock Note
          </button>

          {error && (
            <p className="mt-3 text-sm text-red-600">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Error UI
  if (error && !note) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  // Loading UI
  if (!note) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
    <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-md border border-gray-200">
      <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">
        Shared Note
      </h1>

      <div className="mb-6">
        <label className="mb-2 block text-sm font-semibold text-gray-600">
          Title
        </label>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-xl font-medium text-gray-900">
          {note.title}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-600">
          Content
        </label>

        <div className="min-h-[200px] rounded-lg border border-gray-200 bg-gray-50 p-4 whitespace-pre-wrap leading-7 text-gray-700">
          {note.content}
        </div>
      </div>
    </div>
  </div>
  );
}
