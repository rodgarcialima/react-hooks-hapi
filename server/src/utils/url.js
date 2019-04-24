const { PAGE_LIMIT } = require('../consts');

function getPopulate(req) {
  if (req.query && req.query.populate) {
    const { populate } = req.query;

    // Discover if populate is comming as an array or comma separated string
    if (Array.isArray(populate)) {
      return populate;
    }
    // It's comming as an string
    else {
      return populate.split(',');
    }
  } else return [];
}

function getQuery(req) {
  if (req.query && req.query.query) {
    return JSON.parse(req.query.query);
  } else return {};
}

function getOptions(req) {
  let options = { limit: PAGE_LIMIT };
  if (req.query) {
    const { select, sort, populate, page, limit } = req.query;
    if (select) options.select = select;
    if (sort) options.sort = sort;
    if (populate) options.populate = getPopulate(req);
    if (page) options.page = parseInt(page);
    if (limit) options.limit = parseInt(limit); // page size
  }
  return options;
}

module.exports = {
  getPopulate,
  getQuery,
  getOptions,
};
