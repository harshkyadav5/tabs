import axios from "axios";

export const getMusic = async (req, res) => {
  try {
    const searchTerm = req.query.q || "trending";

    const url = `${process.env.SPOTIFY_API_URL}/search`;

    const response = await axios.get(url, {
      params: {
        q: searchTerm,
        type: "artist,album,track,playlist",
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Spotify data:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error("Message:", error.message);
    }
    res.status(500).json({ error: "Failed to fetch music" });
  }
};
