import axios from "axios";
import React, { useState, useEffect } from "react";
import "./CovidStats.css";


const CovidStats = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState("TotalConfirmed");

  const fetchCovidData = async () => {
    const response = await axios.get("https://api.covid19api.com/summary");
    setData(response.data.Countries);
  };

  useEffect(() => {
    fetchCovidData();
  }, []);

  useEffect(() => {
    const sortedData = data.sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortColumn] - b[sortColumn];
      } else {
        return b[sortColumn] - a[sortColumn];
      }
    });
    setData(sortedData);
  }, [sortOrder, sortColumn, data]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
        <div className="h1">
      <h1>Covid-19 Stats by Country</h1>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by country, code"
          onChange={handleSearchChange}
        />
      </div>
      <select
        value={sortColumn}
        onChange={(e) => setSortColumn(e.target.value)}
      >
        <option value="TotalConfirmed">Total Confirmed</option>
        <option value="TotalDeaths">Total Deaths</option>
        <option value="TotalRecovered">Total Recovered</option>
      </select>
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <table>
        <thead>
          <tr className="header_for_th">
            <th>Country</th>
            <th>New Confirmed</th>
            <th>Total Confirmed</th>
            <th>New Deaths</th>
            <th>Total Deaths</th>
            <th>New Recovered</th>
            <th>Total Recovered</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((country) =>
              country.Country.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((country) => (
              <tr key={country.CountryCode}>
                <td>{country.Country}</td>
                <td>{country.NewConfirmed}</td>
                <td>{country.TotalConfirmed}</td>
                <td>{country.NewDeaths}</td>
                <td>{country.TotalDeaths}</td>
                <td>{country.NewRecovered}</td>
                <td>{country.TotalRecovered}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CovidStats;
