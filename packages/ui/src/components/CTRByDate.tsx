import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { QUERY_CTR_BY_DATE } from "../graphql/queries";
import { DateTime } from "luxon";

const CTRByDateComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date(2021, 7, 1));
  const [dataCTRs, setDataCTRs] = useState([]);

  const { loading, error, data } = useQuery(QUERY_CTR_BY_DATE, {
    variables: {
      inputFilter: {
        date: DateTime.fromJSDate(selectedDate)
          .toUTC()
          .startOf("day")
          .toISODate(),
      },
    },
  });

  useEffect(() => {
    if (!loading && !error) {
      setDataCTRs(data.getCTRByDay);
    }
  }, [loading, error, data]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 text-center">
          <h4 className="text-center">Select a single day</h4>
          <br />
          <br />
          <hr className="line-divider" />
          <div className="mx-auto" style={{ width: "fit-content" }}>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
              }}
              dateFormat="yyyy-MM-dd"
            />
          </div>
        </div>
        <div className="col-md-8">
          <h4 className="text-center">Data per day</h4>
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
              <XAxis
                dataKey="timestamp"
                type="category"
                label={{
                  value: "Time",
                  position: "insideBottomRight",
                  offset: -10,
                }}
              />
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

export default CTRByDateComponent;
