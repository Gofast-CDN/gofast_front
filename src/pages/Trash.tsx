import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import "../custom.css";  
import docIcon from '../assets/text-select.svg';
import pdfIcon from '../assets/file-text.svg';
import videoIcon from '../assets/file-video.svg';
import folderIcon from '../assets/folder-closed.svg'
import SvgIcon from '@/components/svgIcon';
import UploadModal from '@/components/UploadModal';

const Trash = () => {
  const [search, setSearch] = useState('');
  const [storageData, setStorageData] = useState({
    total: 1000, // Total storage in GB
    used: 500, // Used storage in GB
    fileTypes: {
      images: 200, // Storage used by images
      videos: 150, // Storage used by videos
      documents: 100, // Storage used by documents
    },
  });
  const [deletedFiles, setDeletedFiles] = useState([
    { name: 'file1.txt', size: '15 KB', lastEdited: new Date('2025-02-12T02:30:00') },
    { name: 'file2.pdf', size: '1.2 MB', lastEdited: new Date('2025-01-25T09:15:00') },
    { name: 'file3.mp4', size: '350 MB', lastEdited: new Date('2025-02-10T18:00:00') },
  ]);
  const [deletedFolders, setDeletedFolders] = useState([
    { name: 'Folder 1', lastEdited: new Date('2025-02-12T02:30:00') }, 
    { name: 'Folder 2', lastEdited: new Date('2025-01-25T09:15:00') },
  ]);
  
  const folderColors = [
    'bg-gray', 'bg-red', 'bg-yellow', 
    'bg-green', 'bg-blue', 'bg-indigo', 
    'bg-purple', 'bg-pink'
  ];

  const fileTypeColors = {
    images: '#059669',
    videos: '#DC2626',
    documents: '#D97706',
    folders: '#2563EB'
  };

  const formatDate = (date) => {
    const today = new Date();
    const diffTime = today - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
    if (diffDays === 0) {
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0'); 
      return `${hours}:${minutes}`;
    } else if (diffDays === 1) {
      return 'Hier';
    } else {
      return date.toLocaleDateString('fr-FR');
    }
  };

  const [docSvg, setDocSvg] = useState('');
  const [pdfSvg, setPdfSvg] = useState('');
  const [videoSvg, setVideoSvg] = useState('');
  const [folderSvg, setFolderSvg] = useState('');

  useEffect(() => {
    const loadSvg = async (file) => {
      const response = await fetch(file);
      const text = await response.text();
      return text;
    };

    loadSvg(docIcon).then(setDocSvg);
    loadSvg(pdfIcon).then(setPdfSvg);
    loadSvg(videoIcon).then(setVideoSvg);
    loadSvg(folderIcon).then(setFolderSvg);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Section - Search */}
      <div className="p-4 flex items-center justify-between border-b bg-white shadow-sm">
        <Input
          placeholder="Rechercher dans la corbeille..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3 border border-gray-300 p-2 rounded-md"
        />
        <UploadModal />
      </div>

      <div className="grid grid-cols-3 gap-6 p-6">
        {/* Left Section - Files and Folders */}
        <div className="col-span-2 bg-white shadow-md rounded-md p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Mes Dossiers Supprimés</h3>
          </div>
          
          {/* Dossiers Supprimés */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {deletedFolders.map((folder, idx) => {
              const randomColor = folderColors[idx];
              const formattedDate = formatDate(folder.lastEdited);

              return (
                <div
                  key={idx}
                  className={`folder-icon ${randomColor}-500 p-4 rounded-md text-center flex items-center justify-center opacity-50`} // Opacité pour indiquer qu'il est supprimé
                >
                  <div className={`${randomColor}-600 folder-flap`}></div>
                  <div className={`${randomColor}-700 folder-body relative`}>
                    <span className="text-white text-lg font-semibold absolute top-2 left-2">{folder.name}</span>
                    <p className="text-white text-xs absolute bottom-2 right-2">{formattedDate}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Fichiers Supprimés */}
          <h4 className="text-lg font-medium">Derniers Fichiers Supprimés</h4>
          <table className="table-auto mt-2 w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Icône</th>
                <th className="px-4 py-2 text-left">Nom du fichier</th>
                <th className="px-4 py-2 text-left">Taille</th>
                <th className="px-4 py-2 text-left">Dernière édition</th>
              </tr>
            </thead>
            <tbody>
              {deletedFiles.map((file, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-4 py-2">
                    {file.name.endsWith('.txt') && (
                      <img src={docIcon} alt="Doc Icon" className="h-5 w-5 text-gray-500" />
                    )}

                    {file.name.endsWith('.pdf') && (
                      <img src={pdfIcon} alt="PDF Icon" className="h-5 w-5 text-red-500" />
                    )}

                    {file.name.endsWith('.mp4') && (
                      <img src={videoIcon} alt="Video Icon" className="h-5 w-5 text-blue-500" />
                    )}
                  </td>

                  <td className="px-4 py-2">{file.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-500">{file.size}</td>
                  <td className="px-4 py-2 text-sm text-gray-500">{formatDate(file.lastEdited)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Right Section - Storage Usage */}
        <div className="bg-white shadow-md rounded-md p-4 space-y-4">
          <h3 className="text-xl font-semibold">Capacité de stockage</h3>
          <div className="flex justify-between">
            <span>Total : {storageData.total} GB</span>
            <span>Utilisé : {storageData.used} GB</span>
          </div>

          <Progress value={(storageData.used / storageData.total) * 100} className="my-4" />

          {/* Section de stockage par type de fichier */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <SvgIcon color={fileTypeColors.images} svgContent={docSvg} size="32px"/>              
              <span>Images</span>
              <span>{storageData.fileTypes.images} GB</span>
            </div>
            <div className="flex items-center justify-between">
              <SvgIcon color={fileTypeColors.videos} svgContent={videoSvg} size="32px"/>
              <span>Vidéos</span>
              <span>{storageData.fileTypes.videos} GB</span>
            </div>
            <div className="flex items-center justify-between">
              <SvgIcon color={fileTypeColors.documents} svgContent={pdfSvg} size="32px"/>
              <span>Documents</span>
              <span>{storageData.fileTypes.documents} GB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trash;
