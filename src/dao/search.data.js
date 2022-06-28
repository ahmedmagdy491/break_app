const { User, Agency } = require("../schemas/users.schema");

class SearchDAO {
  static SearchQuery(text) {
    const query = { $text: { $search: text } };
    const meta_score = { $meta: "textScore" };
    const sort = [["score", meta_score]];

    return { query, sort };
  }

  static Search({ filters = null, page = 0, resultsPerPage = 20 }) {
    return new Promise(async (resolve, reject) => {
      try {
        let cursor;
        let queryParams = {};
        if (filters.tag === "users") {
          queryParams = this.SearchQuery(filters.keywords);
          cursor = await User.find(queryParams.query, {
            first_name: 1,
            last_name: 1,
            email: 1,
            gender: 1,
            isActive: 1,
            _id: 1,
          });
        } else if (filters.tag === "agencies") {
          queryParams = this.SearchQuery(filters.keywords);
          cursor = await Agency.find(queryParams.query);
        } else {
          reject("unknown search query");
        }
        resolve(cursor);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = SearchDAO;
