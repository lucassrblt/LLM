import React from "react";
import { X, FileText } from "lucide-react";

interface FileOption {
  id: string;
  name: string;
  description: string;
  value: string;
  icon: React.ReactNode;
}

interface FileSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (fileId: string) => void;
}

const fileOptions: FileOption[] = [
  {
    id: "text",
    value: "frontend-doc.pdf",
    name: "Fichier frontend-doc.pdf",
    description: "Fichier de documentation frontend en PDF",
    icon: <FileText className="h-6 w-6 text-purple-600" />,
  },
  {
    id: "code",
    value: "backend-doc.js",
    name: "Fichier backend-code.js",
    description: "Fichier de code backend en JavaScript",
    icon: <FileText className="h-6 w-6 text-purple-600" />,
  },
  {
    id: "json",
    value: "data.json",
    name: "Fichier data.json",
    description: "Fichier de données JSON à traiter",
    icon: <FileText className="h-6 w-6 text-purple-600" />,
  },
];

export default function FileSelectionModal({
  isOpen,
  onClose,
  onSelect,
}: FileSelectionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Select File Type
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* File Options */}
        <div className="p-6 space-y-4">
          {fileOptions.map((file) => (
            <button
              key={file.id}
              onClick={() => {
                onSelect(file.value);
                onClose();
              }}
              className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-purple-50 border-2 border-transparent hover:border-purple-200 transition-all duration-200"
            >
              <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                {file.icon}
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium text-gray-900">{file.name}</h3>
                <p className="text-sm text-gray-500">{file.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
