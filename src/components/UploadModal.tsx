import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"; // Import du bouton de shadcn

const UploadModal = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Utilisation de l'optional chaining
    if (file) {
      setFile(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Bouton qui ouvre la modale */}
      <Button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white p-2 rounded-md"
      >
        Téléverser
      </Button>

      {/* Modale d'upload */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Importer un fichier</DialogTitle>
          </DialogHeader>

          {/* Zone de drop/upload */}
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Cliquez pour téléverser</span>{" "}
                ou glissez-déposez
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG ou GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {/* Aperçu du fichier sélectionné */}
          {file && (
            <div className="flex flex-col items-center gap-4 mt-4">
              {file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-lg"
                />
              ) : (
                <p className="text-gray-600">
                  Fichier sélectionné :{" "}
                  {file?.name || "Aucun fichier sélectionné"}
                </p>
              )}
            </div>
          )}

          {/* Bouton de fermeture */}
          <DialogClose asChild>
            <Button className="bg-red-500 text-white px-4 py-2 rounded-lg">
              Fermer
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadModal;
