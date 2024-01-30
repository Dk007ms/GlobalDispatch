import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Card from "./Card";
import MyContext from "./MyContext";

const Container = React.memo(function Container() {
  const { searchValue, selectedCountry } = useContext(MyContext);
  const [loading, setLoading] = useState(true);
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    console.log(searchValue, selectedCountry); // Log when searchValue or selectedCountry changes

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
        region: "India", // You might want to use selectedCountry here
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
        // Handle error if needed
      } finally {
        setLoading(false);
      }
    }

    getNews();
  }, [searchValue, selectedCountry]);

  return (
    <div className="w-screen h-max relative mx-auto bg-yellow-100 min-h-screen sm:p-8 p-2 pt-8 gap-6 flex flex-wrap justify-center">
      {loading ? (
        <p>Loading...</p>
      ) : newsData && newsData.length > 0 ? (
        newsData.map((news, index) => <Card key={index} news={news} />)
      ) : (
        <p>No news available</p>
      )}
    </div>
  );
});

export default Container;
