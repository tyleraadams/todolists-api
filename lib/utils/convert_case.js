const changeCase = require('change-case');
const _ = require('lodash');

module.exports.convertCaseOfKeys = function (obj, caseType) {
  return _.transform(obj, function (result, val, key) {
    result[changeCase[caseType](key)] = val;
  });
};