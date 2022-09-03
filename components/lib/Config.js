const inProduction = true;
const HTTP = "http";
const productionBaseURL = inProduction
  ? "commerciallistingspro.com"
  : "127.0.0.1";

const Config = {
  url: {
    api: `${HTTP}://${inProduction ? "api." : ""}${productionBaseURL}${
      inProduction ? "" : ":5000"
    }`,
    payment: `${HTTP}://${inProduction ? "pay." : ""}${productionBaseURL}${
      inProduction ? "" : ":8000"
    }`,
    client: `${HTTP}://${productionBaseURL}${inProduction ? "" : ":3000"}`,
    GCP_GC_IMG: "https://storage.googleapis.com/clp-image",
    GCP_GC_P_IMG: "https://storage.googleapis.com/clp-profile-image",
  },
  isInProduction: inProduction,
};

export default Config;
