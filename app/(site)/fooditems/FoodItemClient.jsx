"use client";

import { useContext, useEffect, useState } from "react";
import FoodItem from "./FoodItem";
import { StoreContext } from "@/StoreContext/StoreContext";

export default function FoodItemClient() {
  const { url, lists, setLists } = useContext(StoreContext);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false);

  // รอให้ component อยู่บน client
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !url) return; // รอ client และ url พร้อม

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [menusRes, ratingsRes] = await Promise.all([
          fetch(`${url}/api/menuitems`),
          fetch(`${url}/api/ratings`)
        ]);
        const menusData = await menusRes.json();
        const ratingsData = await ratingsRes.json();

        setLists(menusData.menus);
        setRatings(ratingsData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isClient, url]);

  if (!isClient) return null; // หรือ skeleton loading

  return (
    <div className="p-6">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <FoodItem lists={lists || []} ratings={ratings || []} url={url} />
      )}
    </div>
  );
}
