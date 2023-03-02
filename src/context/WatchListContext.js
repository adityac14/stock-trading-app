import { createContext, useState } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
  const [stockWatchList, setStockWatchList] = useState([
    "GOOGL",
    "MSFT",
    "AMZN",
  ]);

  const addStock = (stock) => {
    // Checking to see if this stock already exists in our list. If it doesn't then add the new stock to the list 
    if (stockWatchList.indexOf(stock) === -1){
        setStockWatchList([...stockWatchList, stock])
    }
  }
  
  const deleteStock = (stock) => {
    setStockWatchList(stockWatchList.filter((element) => {
        return element !== stockWatchList
    }))
  }

  return (
    <WatchListContext.Provider value={{ stockWatchList, addStock, deleteStock }}>
      {props.children}
    </WatchListContext.Provider>
  );
};
