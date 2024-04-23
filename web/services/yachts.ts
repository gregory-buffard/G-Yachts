import axios from "axios";

export const fetchFeatured = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/yachts/featured`,
    );
    return res.data;
  } catch (e) {
    console.error("Error fetching featured yachts: ", e);
    throw e;
  }
};
