import { useParams } from "react-router-dom";

export default function FolderDetails() {
  const { id } = useParams();

  return <div>Folder ID: {id}</div>;
}
