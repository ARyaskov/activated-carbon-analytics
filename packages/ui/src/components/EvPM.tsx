import React, { useEffect, useState } from "react";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./CTR.css";
import { useQuery } from "@apollo/client";
import { QUERY_EVPM_BY_TWO_DATES } from "../graphql/queries";

const EvPMComponent = () => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(2021, 6, 21),
      endDate: new Date(2021, 7, 6),
      key: "selection",
    },
  ]);
  const [dataEvPMs, setDataEvPMs] = useState([]);
  const [mode, setMode] = useState("fclick");

  const { loading, error, data } = useQuery(QUERY_EVPM_BY_TWO_DATES, {
    variables: {
      inputFilter: {
        startDate: dateRange[0].startDate.toISOString().split("T")[0],
        endDate: dateRange[0].endDate.toISOString().split("T")[0],
        mode: mode,
      },
    },
  });

  useEffect(() => {
    if (!loading && !error) {
      setDataEvPMs(data.getEvPMByTwoDates);
    }
  }, [loading, error, data, dateRange, mode]);

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
          <hr className="line-divider" />
          <div className="mt-4">
            <h4>Mode</h4>
            <br />
            <ToggleButtonGroup
              type="radio"
              name="options"
              defaultValue={"fclick"}
              value={mode}
              onChange={(value) => setMode(value)}
            >
              <ToggleButton
                id="fclick"
                className="btn btn-primary"
                value="fclick"
                onChange={() => setMode("fclick")}
              >
                fclick
              </ToggleButton>
              <ToggleButton
                id="registration"
                className="btn btn-primary"
                value="registration"
                onChange={() => setMode("registration")}
              >
                registration
              </ToggleButton>
              <ToggleButton
                id="content"
                className="btn btn-primary"
                value="content"
                onChange={() => setMode("content")}
              >
                content
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <br />
          <br />
          <br />
          <h4>Interval</h4>
          <br />
          <DateRangePicker
            onChange={(ranges) => setDateRange([ranges.selection])}
            ranges={dateRange}
            editableDateInputs
          />
        </div>
        <div className="col-md-8">
          <h4 className="text-center">Data</h4>
          <hr className="line-divider" />
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={dataEvPMs}
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
              <Line type="monotone" dataKey="evpm" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default EvPMComponent;
