// adService.js

const adGifs = [
    "/ads/food.gif",
    "/ads/car.gif",
    "/ads/wae.gif",
    "/ads/singles.gif",
    "/ads/aaa.gif",
    "/ads/ram.gif",
    "/ads/skins.gif",
    "/ads/vbuck.gif",
    "/ads/gam.gif"
];

/**
 * Returns a random ad URL from the list.
 */
export function getRandomAd() {
    return adGifs[Math.floor(Math.random() * adGifs.length)];
}

/**
 * Returns all ads (if needed for galleries, previews, etc.)
 */
export function getAllAds() {
    return [...adGifs];
}