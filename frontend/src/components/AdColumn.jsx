import { Box } from "@mui/material";
import { getAllAds } from "./adService.js";

/**
 * Displays a vertical column of ads
 * @param {number} count - number of ads in the column
 */
export default function AdColumn({ count = 4 }) {
    // pick random ads
    const ads = Array(count)
        .fill("")
        .map(() => getAllAds()[Math.floor(Math.random() * getAllAds().length)]);

    return (
        <>
            {ads.map((ad, index) => (
                <Box
                    key={index}
                    sx={{
                        position: "relative",
                        backgroundColor: "#fff",
                        padding: 1,
                        boxShadow: "0 4px 15px rgba(255, 0, 127, 0.5)",
                        border: "4px solid #ff007f",
                        borderRadius: 3,
                        overflow: "hidden",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: 5,
                            right: 5,
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: "22px",
                            backgroundColor: "rgba(186, 81, 160, 0.8)",
                            padding: "5px 10px",
                            borderRadius: "50px",
                            textTransform: "uppercase",
                            letterSpacing: "2px",
                            textShadow: "2px 2px 8px #fff"
                        }}
                    >
                        AD
                    </Box>
                    <img
                        src={ad}
                        alt={`Ad ${index + 1}`}
                        style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "cover",
                            borderRadius: 3,
                            border: "5px solid #ff66b2",
                            boxShadow: "0 4px 15px rgba(255, 0, 127, 0.3)"
                        }}
                    />
                </Box>
            ))}
        </>
    );
}