import { useQuery } from "@tanstack/react-query";

const getFile = async () => {
  const res = await fetch(
    "https://pdfobject.com/pdf/sample.pdf"
    //"https://static.charmingsardinia.com/hotels/1317/static/files/th-freebeach-sardinia01.jpg"
  );
  return res;
};

const fileDownload = () => {
  const { refetch: refetchFile } = useQuery({
    queryKey: ["file"],
    queryFn: getFile,
    enabled: false,
  });

  const handleDownload = async () => {
    const { data: file } = await refetchFile();
    if (!file) {
      console.error("No file data");
      return;
    }
    const fileBlob = await file.blob();
    const mimeType = fileBlob.type;
    console.log("MIME type:", mimeType);
    const url = URL.createObjectURL(fileBlob);
    if (mimeType === "application/pdf") {
      window.open(url, "_blank");
      return;
    }
    const link = document.createElement("a");
    link.href = url;
    link.download = "beach.jpg";
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1>fileDownload</h1>
      <button onClick={handleDownload}>fileDownload</button>
    </div>
  );
};

export default fileDownload;
