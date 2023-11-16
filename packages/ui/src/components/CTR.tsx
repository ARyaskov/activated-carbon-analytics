import React, { useEffect, useState } from "react";
import {
  LineChart,
  BarChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Treemap,
} from "recharts";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./CTR.css";
import { useQuery } from "@apollo/client";
import { QUERY_CTR_BY_DATE, QUERY_CTR_BY_TWO_DATES } from "../graphql/queries";

const CTRComponent = () => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(2021, 6, 21),
      endDate: new Date(2021, 7, 6),
      key: "selection",
    },
  ]);
  const [dataCTRs, setDataCTRs] = useState([]);

  const { loading, error, data } = useQuery(QUERY_CTR_BY_TWO_DATES, {
    variables: {
      inputFilter: {
        startDate: dateRange[0].startDate.toISOString().split("T")[0],
        endDate: dateRange[0].endDate.toISOString().split("T")[0],
      },
    },
  });

  useEffect(() => {
    if (!loading && !error) {
      setDataCTRs(data.getCTRByTwoDates);
    }
  }, [loading, error, data, dateRange]);

  const renderXAxis = () => {
    return (
      <XAxis
        dataKey="timestamp"
        type="category"
        label={{
          value: "Datetime",
          position: "insideBottomRight",
          offset: -10,
        }}
      />
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 text-center">
          <h4 className="text-center">Select interval</h4>
          <hr className="line-divider" />
          <div className="mx-auto" style={{ width: "fit-content" }}>
            <DateRangePicker
              onChange={(ranges) => setDateRange([ranges.selection])}
              ranges={dateRange}
              editableDateInputs
            />
          </div>
        </div>
        <div className="col-md-8">
          <h4 className="text-center">Data per interval</h4>
          <hr className="line-divider" />
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={dataCTRs}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              {renderXAxis()}
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="ctr" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CTRComponent;
