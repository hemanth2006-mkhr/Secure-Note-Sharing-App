import {
  Calendar,
  Eye,
  Clock3,
  Infinity,
  Flame,
} from "lucide-react";

import api from "../services/api";

const badgeColors = {
  public: "bg-green-100 text-green-700",
  password: "bg-orange-100 text-orange-700",
  "one-time": "bg-purple-100 text-purple-700",
  draft: "bg-gray-200 text-gray-700",
};

export default function NoteCard({
  noteId,
  accessType,
  title,
  content,
  createdAt,
  viewCount,
  expiryDate,
  isRevoked,
  onRevoke,
}) {

  return (
    <div className="w-82.5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      {/* Badge */}
      <span
        className={`inline-flex rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wide ${badgeColors[accessType]
          }`}
      >
        {accessType}
      </span>
      {/* Title */}
      <h2 className="mt-5 text-3xl font-semibold leading-tight text-gray-900">
        {title}
      </h2>
      {/* Description */}
      <p className="mt-3 line-clamp-3 text-lg text-gray-500">
        {content}
      </p>
      {/* Divider */}
      <div className="my-5 border-t border-gray-200"></div>
      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span>{createdAt}</span>
        </div>
        <div className="flex items-center gap-2">
          <Eye size={16} />
          <span>{viewCount}</span>
        </div>
        <div className={`flex items-center gap-2 font-medium`}>
          {expiryDate === null ? (
            <Infinity size={16} />
          ) : expiryDate === "expired" ? (
            <Flame size={16} />
          ) : (
            <Clock3 size={16} />
          )}
          <span>{expiryDate}</span>
        </div>
        
      </div>
      <button
  className={`w-full mt-4 p-2 rounded-md text-white cursor-pointer ${
    isRevoked ? "bg-gray-500" : "bg-red-500"
  }`}
  disabled={isRevoked}
  onClick={() => onRevoke(noteId)}
>
  {isRevoked ? "Revoked" : "Revoke"}
</button>
    </div>
  );
}