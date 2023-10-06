class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  filter() {
    // 1-filering
    const queryObj = { ...this.queryString };
    const excludeFields = ["sort", "page", "limit", "fields", "keyword"];
    excludeFields.forEach((field) => delete queryObj[field]);
    let querystr = JSON.stringify(queryObj);
    querystr = querystr.replace(/(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(querystr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      // take (name -price) like this without ','
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select();
    }
    return this;
  }

  search(modelName) {
    if (this.queryString.keyword) {
      let query = {};
      if (modelName === "Products") {
        query.$or = [
          { title: { $regex: this.queryString.keyword, $options: "i" } },
          { description: { $regex: this.queryString.keyword, $options: "i" } },
        ];
      } else {
        query = { name: { $regex: this.queryString.keyword, $options: "i" } };
      }
      this.mongooseQuery = this.mongooseQuery.find(query);
    }
    return this;
  }

  paginate(countDocuments) {
    console.log("ahmed");
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || process.env.limit || 10;
    const skip = (page - 1) * limit;
    const endIndex = page * limit;
    this.mongooseQuery.skip(skip).limit(limit);

    //pagination results
    const pagination = {};
    pagination.currentPage = page;
    pagination.limit = limit;
    pagination.pages = Math.ceil(countDocuments / limit);
    if (endIndex < countDocuments) {
      pagination.nextPage = page + 1;
    }
    if (skip > 0) {
      pagination.prev = page - 1;
    }
    this.paginationResults = pagination;
    return this;
  }
}

module.exports = ApiFeatures;
