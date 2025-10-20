"use client";

import { useContext, useEffect, useState } from "react";
import FoodItem from "./FoodItem";
import { StoreContext } from "@/StoreContext/StoreContext";

export default function FoodItemClient() {
  const { url, lists, setLists } = useContext(StoreContext);
  const [ratings, setRatings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!url || url.trim() === "") {
      console.log("URL is null, undefined, or empty");
      return;
    }
    setLoading(true);
    setError(null);


    Promise.all([
      fetch(`${url}/api/menuitems`).then(res => res.json()),
      fetch(`${url}/api/ratings`).then(res => res.json())
    ])
      .then(([menusData, ratingsData]) => {
        setLists(menusData.menus);
        setRatings(ratingsData);
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [url]);

  return (
    <div className="p-6">
      <FoodItem
        lists={lists || []}
        ratings={ratings || []}
        url={url} />
    </div>
  );
}
