import API from "../../../api";

const fetchUser = async () => {
  // const token = localStorage.getItem("token");

  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const userDetails = await API.get("/api/auth/me");
    return userDetails.data;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

export default fetchUser;
