import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import CtrComponent from "./components/CTR";
import CTRByDateComponent from "./components/CTRByDate";
import ModelsComponent from "./components/Models";
import EvPMComponent from "./components/EvPM";

const QUERY_MODELS = gql`
  query getTop50Models {
    getTop50Models {
      name
      amount
    }
  }
`;

function Application() {
  const {
    loading: loadingModels,
    error,
    data: models,
  } = useQuery(QUERY_MODELS);

  return (
    <div>
      <div>
        <div className="container mt-5">
          <h1 className="display-2 text-center text-primary">
            Activated Carbon Analytics
          </h1>
        </div>

        <h3 className="display-4 text-center text-dark">
          EvPM By Date Interval
        </h3>
        <EvPMComponent />
        <hr className="bg-info border-2 border-top border-info" />
        <h3 className="display-4 text-center text-dark">CTR By Date</h3>
        <CTRByDateComponent />
        <hr className="bg-info border-2 border-top border-info" />
        <h3 className="display-4 text-center text-dark">
          CTR By Date Interval
        </h3>
        <CtrComponent />
        <hr className="bg-info border-2 border-top border-info" />
        <div className="container mt-5">
          <h3 className="display-4 text-center text-dark">Devices</h3>
          <ModelsComponent data={models?.getTop50Models} />
        </div>
      </div>
    </div>
  );
}

export default Application;
