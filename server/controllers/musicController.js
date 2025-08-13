import axios from "axios";

export const getMusic = async (req, res) => {
  try {
    const searchTerm = req.query.q || "trending";
    const url = `${process.env.SPOTIFY_API_URL}/search`;

    const response = await axios.get(url, {
      params: {
        q: searchTerm,
        type: "track,artist,playlist,album",
      },
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

export const getNewReleases = async (req, res) => {
  try {
    const url = `${process.env.SPOTIFY_API_URL}/browse/new`;
    const response = await axios.get(url, {
      params: {
        perPage: 20,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching new releases:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error("Message:", error.message);
    }
    res.status(500).json({ error: "Failed to fetch new releases" });
  }
};
