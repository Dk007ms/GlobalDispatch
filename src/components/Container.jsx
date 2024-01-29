import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Card from "./Card";
import MyContext from "./MyContext";

export default function Container() {
  const { searchValue, setSearchValue } = useContext(MyContext);
  const { selectedCountry, setSelectedCountry } = useContext(MyContext);
  const [loading, setLoading] = useState(true);
  const [newsData, setNewsData] = useState([]);
  console.log(searchValue, selectedCountry);

  const options = {
    method: "POST",
    url: "https://newsnow.p.rapidapi.com/",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "6d12c9a9a0msh6148d240117b72dp19750cjsn96fec8211a5d",
      "X-RapidAPI-Host": "newsnow.p.rapidapi.com",
    },
    data: {
      text: searchValue,
      region: "India",
      max_results: 120,
    },
  };

  async function getNews() {
    try {
      const response = await axios.request(options);
      const output = response.data.news;
      console.log(output);
      setNewsData(output);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div className="w-screen h-max relative mx-auto bg-yellow-100 min-h-screen sm:p-8 p-2 pt-8 gap-6 flex flex-wrap">
      {loading ? (
        <p>Loading...</p>
      ) : newsData && newsData.length > 0 ? (
        newsData.map((news, index) => <Card key={index} news={news} />)
      ) : (
        <p>No news available</p>
      )}
    </div>
  );
}
