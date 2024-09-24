const products = require("../model/products");

const getAllProductsStatic = async (req, res) => {
  // throw new Error()
  const product = await products.find({});
  res.status(200).json({ count: product.length, product });
};
const getAllProducts = async (req, res) => {
  const {user: {user, userId}} = req
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObj = {};
  if (typeof featured !== "undefined" && featured === "true") {
    queryObj.featured = true; // Only filter by featured if checkbox is checked
  }

  if (company) {
    queryObj.company = company;
  }
  if (name) {
    queryObj.name = { $regex: name, $options: "i" };
  }
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      "<": "$lt",
      ">=": "$gte",
      "<=": "$lte",
      "=": "$eq",
    };
    const regEx = /\b(>|>=|<|<=|=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        if (!queryObj[field]) {
          queryObj[field] = {};
        }
        queryObj[field][operator] = Number(value);
      }
    });
  }

  let result = products.find( queryObj );
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);  
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  const page = Number(req.query.page) || 1; 
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  const totalItems = await products.countDocuments();   
  const product = await result; 
  res.status(200).json({ product, nbHits: product.length, totalItems, user, userId });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
