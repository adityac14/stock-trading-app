import { createContext, useState, useEffect } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
  

  const [stockWatchList, setStockWatchList] = useState(
    // Checks to see if local storage exists if not it will return null and it will default the original stock array ['GOOGL', 'MSFT', 'AMZN']
    localStorage.getItem("stockWatchList")?.split(",") || [
      "GOOGL",
      "MSFT",
      "AMZN",
    ]
  )

  useEffect(() => {
    localStorage.setItem("stockWatchList", stockWatchList)

  }, [stockWatchList])

  const addStock = (stock) => {
    // Checking to see if this stock already exists in our list. If it doesn't then add the new stock to the list 
    if (stockWatchList.indexOf(stock) === -1){
        setStockWatchList([...stockWatchList, stock])
    }
  }
  
  const deleteStock = (stock) => {
    setStockWatchList(stockWatchList.filter((element) => {
        return element !== stock
    }))
  }

  return (
    <WatchListContext.Provider value={{ stockWatchList, addStock, deleteStock }}>
      {props.children}
    </WatchListContext.Provider>
  );
};
