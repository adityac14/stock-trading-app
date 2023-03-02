import { useState } from "react";

export const AutoComplete = () => {
  const [search, setSearch] = useState();

  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input
          style={{ backgroundColor: "rgba(145, 158, 171, 0.04" }}
          id="search"
          type="text"
          className="form-control"
          placeholder="Search"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}>
        </input>

        <label htmlFor="search">Search</label>
        <ul className="dropdown-menu">
          <li>Stock 1</li>
          <li>Stock 2</li>
          <li>Stock 3</li>
        </ul>
      </div>
    </div>
  );
};
