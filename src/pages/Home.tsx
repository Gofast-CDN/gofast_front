import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import "../custom.css";  
import docIcon from '../assets/text-select.svg';
import pdfIcon from '../assets/file-text.svg';
import videoIcon from '../assets/file-video.svg';
import folderIcon from '../assets/folder-closed.svg'
import fileIcon from '../assets/file.svg';
import SvgIcon from '@/components/svgIcon';
import UploadModal from '@/components/UploadModal';

const Dashboard = () => {
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
  const [recentFiles, setRecentFiles] = useState([
    { name: 'file1.txt', size: '15 KB', lastEdited: new Date('2025-02-12T02:30:00') },
    { name: 'file2.pdf', size: '1.2 MB', lastEdited: new Date('2025-01-25T09:15:00') },
    { name: 'file3.mp4', size: '350 MB', lastEdited: new Date('2025-02-10T18:00:00') },
    { name: 'file4.pdf', size: '15 KB', lastEdited: new Date('2025-02-12T02:30:00') },
    { name: 'file5.pdf', size: '1.2 MB', lastEdited: new Date('2025-01-25T09:15:00') },
    { name: 'file6.txt', size: '350 MB', lastEdited: new Date('2025-02-10T18:00:00') },
  ]);
  
  
  const [folders, setFolders] = useState([
    { name: 'Folder 1', lastEdited: new Date('2025-02-12T02:30:00') }, 
    { name: 'Folder 2', lastEdited: new Date('2025-01-25T09:15:00') }, 
    { name: 'Folder 3', lastEdited: new Date('2025-02-10T18:00:00')  },
  ]);
  const [recentFolders, setRecentFolders] = useState([
    'Recent Folder 1', 'Recent Folder 2', 'Recent Folder 3', // Sample recent folders
  ]);

  const storagePercentage = (storageData.used / storageData.total) * 100;

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
  const [fileSvg, setFileSvg] = useState('');

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
    loadSvg(fileIcon).then(setFileSvg);
  }, []);

  
  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Section - Search and Upload */}
      <div className="p-4 flex items-center justify-between border-b bg-white shadow-sm">
        <Input
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3 border border-gray-300 p-2 rounded-md"
        />
      <UploadModal />
      </div>

      <div className="grid grid-cols-3 gap-6 p-6">
        {/* Left Section - Files and Folders */}
        <div className="col-span-2 bg-white shadow-md rounded-md p-4">
          <div className="flex space-x-4">
            <button type="button" className="px-6 py-3.5 text-base font-medium text-white inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              <SvgIcon color="white" svgContent={folderSvg} size="32px"/>
              Créer un dossier
            </button>

            <button type="button" className="px-6 py-3.5 text-base font-medium text-white inline-flex items-center bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 rounded-lg text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">
              <SvgIcon color="white" svgContent={fileSvg} size="32px"/>
              Modifier le fichier
            </button>

            <button type="button" className="px-6 py-3.5 text-base font-medium text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
              <SvgIcon color="white" svgContent={fileSvg} size="32px"/>
              Supprimer des fichiers
            </button>

            <button type="button" className="px-6 py-3.5 text-base font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <SvgIcon color="white" svgContent={fileSvg} size="32px"/>
              Exporter les fichiers
            </button>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Mes Dossiers</h3>
            <Button onClick={() => router.push("/dossiers")} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              Voir Tous
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {folders.map((folder, idx) => {
              const randomColor = folderColors[idx];
              const formattedDate = formatDate(folder.lastEdited);

              return (
                <div
                  key={idx}
                  className={`folder-icon ${randomColor}-500 p-4 rounded-md text-center flex items-center justify-center`}
                >
                  <div className={`${randomColor}-600 folder-flap`}></div>
                  <div className={`${randomColor}-700 folder-body relative`}>
                    {/* Titre en haut à gauche */}
                    <span className="text-white text-lg font-semibold absolute top-2 left-2">{folder.name}</span>
              
                    {/* Date en bas à droite */}
                    <p className="text-white text-xs absolute bottom-2 right-2">{formattedDate}</p>
                  </div>
                </div>
              );
              
            })}
          </div>

          <h4 className="text-lg font-medium">Derniers fichiers uploadés</h4>
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
              {recentFiles.map((file, idx) => (
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

        {/* Right Section - Storage Usage and Recent Folders */}
        <div className="bg-white shadow-md rounded-md p-4 space-y-4">
          <h3 className="text-xl font-semibold">Capacité de stockage</h3>
          <div className="flex justify-between">
            <span>Total : {storageData.total} GB</span>
            <span>Utilisé : {storageData.used} GB</span>
          </div>

          <Progress value={storagePercentage} className="my-4" />

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

          <h4 className="text-lg font-medium">Derniers dossiers consultés</h4>
          <ul className="space-y-2">
            {recentFolders.map((folder, idx) => (
              <li key={idx} className="text-gray-700 flex items-center justify-between">
                <span>{folder}</span>
                <SvgIcon color={fileTypeColors.folders} svgContent={folderSvg} size="32px"/>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
