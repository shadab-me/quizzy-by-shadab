import React, { useState } from "react";
import Button from "components/Button";
import report from "apis/report";
import PageLoader from "components/Common/PageLoader";

function DownloadReport() {
  let [loading, setLoading] = useState(false);
  function downloadFile(reponse) {
    const fileData = new Blob([reponse.data], {
      type: "application/xlsx",
    });
    const fileObjectUrl = window.URL.createObjectURL(fileData);
    const link = document.createElement("a");
    link.setAttribute("download", "report.xlsx");
    link.href = fileObjectUrl;
    document.body.append(link);
    window.requestAnimationFrame(() => {
      const event = new MouseEvent("click");
      link.dispatchEvent(event);
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    });
  }
  const fileDownloadHandler = async () => {
    try {
      setLoading(true);
      const response = await report.getFile();
      downloadFile(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      logger.error(error);
    }
  };
  if (loading) return <PageLoader />;
  return (
    <div className="w-full h-full flex justify-center items-center mt-40">
      <div className="">
        <h1 className="text-2xl">Your File is ready to Download.</h1>
        <div className="">
          <div className="w-1/2 mx-auto my-0 mt-1">
            <Button
              size={"medium"}
              type={"button"}
              onClick={() => fileDownloadHandler()}
              iconClass={"ri-file-download-line"}
              buttonText={"Download"}
            ></Button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DownloadReport;
