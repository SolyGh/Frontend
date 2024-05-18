import React from "react";
import { Button } from "../components";
import { earningData } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import Pagination from "../components/pagination/Pagination";
import { Loading } from "../components/loading/Loading";
import { Link } from "react-router-dom";
import { SiShopware } from "react-icons/si";

const Main = () => {
  const { news, loadingNews } = useStateContext();
  const timeAgo = (publishedAt) => {
    const date = new Date(publishedAt);
    const now = new Date();

    const seconds = Math.floor((now - date) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
      return interval + " year" + (interval === 1 ? "" : "s") + " ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval + " month" + (interval === 1 ? "" : "s") + " ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval + " day" + (interval === 1 ? "" : "s") + " ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval + " hour" + (interval === 1 ? "" : "s") + " ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + " minute" + (interval === 1 ? "" : "s") + " ago";
    }
    return Math.floor(seconds) + " second" + (Math.floor(seconds) === 1 ? "" : "s") + " ago";
  };

  return (
    <div className="mt-4 pl-3">
      <div className="mb-4">
        <Link to="/" className="items-center gap-3 ml-3 mt-4 flex text-xl font-extralight tracking-tight dark:text-white text-slate-900">
          <SiShopware /> <span>PFMS</span>
        </Link>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap justify-center px-5 h-screen">
        {loadingNews ? (
          <div className="flex justify-center items-center h-screen">
            <Loading />
          </div>
        ) : (
          <ul className="w-full">
            {news.map((article) => {
              return (
                <li className="py-4 w-full border-b-1 border-blue-200" key={article.source}>
                  <div className="flex justify-start">
                    <div className="flex-shrink-0 mr-3" style={{ width: "220px" }}>
                      <img src={article.image_url} alt="" className="w-full" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex text-blue-900">
                        <p>Source: {article.source}</p>
                        {/* <span className="" style={{maxWidth:"25%"}}> */}
                        {/* <p className="whitespace-nowrap overflow-ellipsis overflow-hidden">{article.source || "Unknown"}</p> */}
                        {/* </span> */}
                        <span className="px-2">.</span>
                        <p>{timeAgo(article.published_at)}</p>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                      <p>{article.description}</p>
                      <p className="my-2">{article.snippet}</p>
                      <a href={article.url} target="_blank" rel="noreferrer" className=" hover:text-blue-700">
                        Read Article
                      </a>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {/*  <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold "> Earnings</p>
              <p className="text-2xl">$43,344,34</p>
            </div>
          </div>
          <div className="mt-6">
            <Button color="white" bgColor={currentColor} text="Download" borderRadius="10px" size="md" />
          </div>
        </div>

        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {earningData.map((item) => (
            <div
              key={item.title}
              className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl "
            >
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl  opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg  font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>{item.percentage}</span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{item.title}</p>
            </div>
          ))}
        </div> */}
      </div>
      {loadingNews ? "" : <Pagination />}
    </div>
  );
};

export default Main;
