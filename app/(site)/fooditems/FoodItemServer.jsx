import FoodItem from "./FoodItem.jsx";

// Mock data fallback สำหรับ prerender
const fallbackMenus = [
  { _id: "1", name: "Loading...", description: "", price: 0, category: "drink", imageUrl: "" },
];

const fallbackRatings = [];

export default async function FoodItemServer() {
  const url = process.env.NEXT_PUBLIC_BASE_URI || "http://localhost:3000";

  let lists = fallbackMenus;
  let ratings = fallbackRatings;

  // แยก try/catch ป้องกัน build crash
  try {
    // fetch แบบ ISR (revalidate 60s)
    const [listRes, ratingsRes] = await Promise.all([
      fetch(`${url}/api/menuitems`, { next: { revalidate: 60 } }),
      fetch(`${url}/api/ratings`, { next: { revalidate: 60 } }),
    ]);

    const listsData = await listRes.json();
    lists = listsData?.menus || fallbackMenus;

    ratings = (await ratingsRes.json()) || fallbackRatings;
  } catch (err) {
    console.warn("Fetch failed, using fallback data:", err);
  }

  return (
    <div className="p-6">
      <FoodItem lists={lists} ratings={ratings} url={url} />
    </div>
  );
}
