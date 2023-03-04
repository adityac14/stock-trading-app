import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import finnHub from "../apis/finnHub";
import { StockChart } from "../components/StockChart";

const formatData = (data) => {
  return data.t.map((element, index) => {
    return {
      x: element * 1000,
      y: data.c[index].toFixed(2),
    };
  });
};

export const StockDetailPage = () => {
  // Destructuring to get the symbol property in the URL
  const { symbol } = useParams();
  const [chartData, setChartData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date();
      const currentTimeSeconds = Math.floor(date.getTime() / 1000)
      let oneDayAgo;

      if (date.getDate() === 6) {
        oneDayAgo = currentTimeSeconds - 2 * 24 * 60 * 60;
      } else if (date.getDate() === 0) {
        oneDayAgo = currentTimeSeconds - 3 * 24 * 60 * 60;
      } else {
        oneDayAgo = currentTimeSeconds - 24 * 60 * 60;
      }

      const oneWeekAgo = currentTimeSeconds - 7 * 24 * 60 * 60
      const oneYearAgo = currentTimeSeconds - 365 * 24 * 60 * 60

      try {
        const responses = await Promise.all([
          finnHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneDayAgo,
              to: currentTimeSeconds,
              resolution: 30,
            },
          }),
          finnHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneWeekAgo,
              to: currentTimeSeconds,
              resolution: 60,
            },
          }),
          finnHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneYearAgo,
              to: currentTimeSeconds,
              resolution: "W",
            },
          }),
        ]);
        console.log(responses);

        setChartData({
          day: formatData(responses[0].data),
          week: formatData(responses[1].data),
          year: formatData(responses[2].data),
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [symbol]);

  // chartData && = if chartData is not null then render out this data
  // if it is null it will render nothing, basically an if statement
  return <div>{chartData && (
    <div>
        <StockChart chartData={chartData} symbol={symbol}/>
        
    </div>
  )}
  </div>
};

// const chartData = {
//     day: "data for one day",
//     week: "data for a week",
//     year: "data for year"

// }

// const data = [{x: 4, y:2}]
