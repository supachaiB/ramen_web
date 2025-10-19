import FoodItem from "./FoodItem";



export default async function FoodItemServer() {
  const url = process.env.BASE_URI

  // รับ null ก่อน เพราะยังไม่มี url ตอน deploy
  if (!url) {
    return null;
  }

  // fetch data แบบ ISR (revalidate 60s)
  const listRes = await fetch(url + "/api/menuitems", { next: { revalidate: 60 } })
  const listsData = await listRes.json(); // ✅ fallback เป็น array
  const lists = listsData.menus; // <-- เอา array ออกมา

  const ratingsRes = await fetch(url + "/api/ratings", { next: { revalidate: 60 } })
  const ratings = await ratingsRes.json();

  return (
    <div className="p-6">
      <FoodItem lists={lists} ratings={ratings} url={url} />
    </div>
  );
}