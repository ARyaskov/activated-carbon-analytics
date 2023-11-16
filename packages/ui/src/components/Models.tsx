import React from "react";
import { Treemap, Tooltip, ResponsiveContainer } from "recharts";

const ModelsComponent = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <Treemap
        width={600}
        height={400}
        data={data}
        dataKey="amount"
        stroke="#fff"
        aspectRatio={1 / 1}
        fill="#3d91ff"
      >
        <Tooltip />
      </Treemap>
    </ResponsiveContainer>
  );
};

export default ModelsComponent;
