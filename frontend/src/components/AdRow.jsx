import { Box } from "@mui/material";
import { getAllAds } from "./adService.js";

/**
 * Displays a row of random ads
 * @param {number} count - number of ads to display
 */
export default function AdRow({ count = 4 }) {
    // Pick random ads
    const ads = Array(count)
        .fill("")
        .map(() => getAllAds()[Math.floor(Math.random() * getAllAds().length)]);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
                marginTop: "20px",
                padding: "10px 0"
            }}
        >
            {ads.map((ad, index) => (
                <Box
                    key={index}
                    sx={{
                        width: "220px",
                        height: "220px",
                        overflow: "hidden",
                        borderRadius: "8px",
                        boxShadow: "0 4px 15px rgba(255, 0, 127, 0.5)",
                        border: "2px solid #ff007f"
                    }}
                >
                    <img
                        src={ad}
                        alt={`Ad ${index + 1}`}
                        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
                    />
                </Box>
            ))}
        </Box>
    );
}