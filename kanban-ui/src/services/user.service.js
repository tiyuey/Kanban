import http from "../http-common";

class UserDataService {
  signup(username, password) {
    return http.post("/signup", { username, password });
  }

  login(username, password) {
    return http.post("/login", { username, password });
  }
}

export default new UserDataService();
