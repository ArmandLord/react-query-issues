import axios from "axios";

export const githubApi = axios.create({
  baseURL: "https://api.github.com/repos/facebook/react",
  headers: {
    Authorization:
      "Bearer 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",
  },
});
