import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

export default function Container() {
  const [loading, setLoading] = useState(true);
  const [newsData, setNewsData] = useState([]);

  const options = {
    method: "POST",
    url: "https://newsnow.p.rapidapi.com/",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "5328498bb2msh1ac2d920339bf1ep10b4c8jsn4ef973c5a23b",
      "X-RapidAPI-Host": "newsnow.p.rapidapi.com",
    },
    data: {
      text: "Elon Musk",
      region: "world",
      max_results: 120,
    },
  };

  async function getNews() {
    try {
      const response = await axios.request(options);
      console.log(response);
      const output = response.data.news;
      console.log(output);
      setNewsData(output);
      console.log(newsData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getNews();
  }, []); // Empty dependency array means this effect will run only once, similar to componentDidMount

  return (
    <div className="w-screen h-max relative mx-auto bg-yellow-100 sm:p-8 p-2 pt-8 gap-6 flex flex-wrap">
      {loading ? (
        <p>Loading...</p>
      ) : (
        newsData.map((news, index) => <Card key={index} news={news} />)
      )}
    </div>
  );
}
