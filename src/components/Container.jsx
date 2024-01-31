import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Card from "./Card";
import MyContext from "./MyContext";

const Container = React.memo(function Container() {
  const { searchValue, selectedCountry } = useContext(MyContext);
  const [loading, setLoading] = useState(true);
  const [newsData, setNewsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10;

  useEffect(() => {
    const options = {
      method: "POST",
      url: "https://newsnow.p.rapidapi.com/",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "a40531de73mshf5e68908b7cc208p17df9fjsn868438ac29c7",
        "X-RapidAPI-Host": "newsnow.p.rapidapi.com",
      },
      data: {
        text: searchValue,
        region: selectedCountry,
        max_results: 120,
      },
    };

    async function getNews() {
      try {
        const response = await axios.request(options);
        const output = response.data.news;
        setNewsData(output);
      } catch (error) {
        // Handle error if needed
      } finally {
        setLoading(false);
      }
    }

    getNews();
  }, [searchValue, selectedCountry]);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = newsData.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPageCount = Math.ceil(newsData.length / cardsPerPage);

  const renderPaginationButtons = () => {
    const pagesToShow = window.innerWidth < 768 ? 1 : 2; // Adjust the number of pages to show based on screen size

    const buttons = [];

    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => paginate(currentPage - 1)}
        className={`mx-2 px-3 py-1 rounded ${
          currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-300"
        }`}
        disabled={currentPage === 1}
      >
        Prev
      </button>
    );

    // Pages before the current page
    for (let i = Math.max(1, currentPage - pagesToShow); i < currentPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`mx-2 px-3 py-1 rounded ${
            currentPage === i ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }

    // Current page
    buttons.push(
      <button
        key={currentPage}
        onClick={() => paginate(currentPage)}
        className={`mx-2 px-3 py-1 rounded bg-blue-500 text-white`}
      >
        {currentPage}
      </button>
    );

    // Pages after the current page
    for (
      let i = currentPage + 1;
      i <= Math.min(totalPageCount, currentPage + pagesToShow);
      i++
    ) {
      buttons.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`mx-2 px-3 py-1 rounded ${
            currentPage === i ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }

    // Next button
    buttons.push(
      <button
        key="next"
        onClick={() => paginate(currentPage + 1)}
        className={`mx-2 px-3 py-1 rounded ${
          currentPage === totalPageCount
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-gray-300"
        }`}
        disabled={currentPage === totalPageCount}
      >
        Next
      </button>
    );

    return buttons;
  };

  return (
    <div className="flex flex-col items-center bg-yellow-100 min-h-screen p-4">
      {loading ? (
        <p className="text-center text-xl font-bold mb-4">Loading...</p>
      ) : currentCards && currentCards.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6">
          {currentCards.map((news, index) => (
            <Card key={index} news={news} />
          ))}
        </div>
      ) : (
        <p className="text-center text-xl font-bold mt-8">No news available</p>
      )}

      {/* Pagination controls */}
      <div className="flex justify-center mt-4">
        {renderPaginationButtons()}
      </div>
    </div>
  );
});

export default Container;
