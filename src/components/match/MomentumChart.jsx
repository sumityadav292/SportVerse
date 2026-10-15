import PropTypes from "prop-types";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

export default function MomentumChart({ data }) {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer>
        <AreaChart data={data}>
          <XAxis dataKey="minute" stroke="#ffffff40" />
          <Tooltip contentStyle={{ background: "#05060A", border: "1px solid #ffffff22" }} />
          <Area type="monotone" dataKey="home" stroke="#00FF87" fill="#00FF8733" />
          <Area type="monotone" dataKey="away" stroke="#FF2D55" fill="#FF2D5533" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

MomentumChart.propTypes = {
  data: PropTypes.array,
};
