// libs/reviewLogic.js
export function calculateAverage(reviews) {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / reviews.length).toFixed(1); // ค่าเฉลี่ยทศนิยม 1 ตำแหน่ง
}
