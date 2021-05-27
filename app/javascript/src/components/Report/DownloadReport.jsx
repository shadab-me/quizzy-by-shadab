import React, { useState } from "react";
import Button from "components/Button";
import report from "apis/report";

function DownloadReport() {
  let [loading, setLoading] = useState(false);
  const url = `/report`;

  const fileDownloadHandler = async () => {
    window.open(url, "_black").focus();
  };

  return (
    <div className="w-full h-full flex justify-center items-center mt-40">
      <div className="">
        <h1 className="text-2xl">Your File is ready to Download.</h1>
        <div className="">
          <div className="w-1/2 mx-auto my-0 mt-1">
            <a style={{ display: "table-cell" }} href={url} target="_blank">
              <Button
                size={"medium"}
                type={"button"}
                iconClass={"ri-file-download-line"}
                buttonText={"Download"}
              ></Button>{" "}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DownloadReport;
