import React, { useEffect, useState } from "react";
import ReportTable from "components/Report/ReportTable";
import PageLoader from "components/Common/PageLoader";
import quizAttempt from "apis/quizattempt";
import Button from "components/Button";
import report from "apis/report";
import { useHistory } from "react-router-dom";

const Report = () => {
  let [attempts, setAttempts] = useState([]);
  let [loading, setLoading] = useState(false);
  let history = useHistory();
  const fetchReport = async () => {
    try {
      setLoading(true);
      const { data } = await quizAttempt.all();
      setAttempts(data.report);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  const downloadHandler = async () => {
    try {
      setLoading(true);
      const data = await report.create();
      history.push("/download/report");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      logger.error(error);
    }
  };

  if (loading) return <PageLoader />;
  return (
    <>
      <h1 className="text-3xl mx-8 my-5 font-bold">Report</h1>
      <div className="flex justify-end mr-24 mb-8">
        <div>
          <Button
            onClick={() => downloadHandler()}
            size={"medium"}
            type={"button"}
            iconClass={"ri-file-download-line"}
            buttonText={"Download"}
          ></Button>{" "}
        </div>
      </div>
      <ReportTable attempts={attempts} />
    </>
  );
};

export default Report;
