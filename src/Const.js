export const BASE_URL = "https://ecom-backend-mu.vercel.app/";
// export const BASE_URL= "http://localhost:5000/"

export const headerData = {
  authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
};
