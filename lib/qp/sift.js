var sift = require('sift');

function buildQuery(node) {
  switch(node.token) {
    case 'AND':
      return {
        $and: [
          buildQuery(node.left),
          buildQuery(node.right)
        ]
      }
    case 'OR':
      return {
        $or: [
          buildQuery(node.left),
          buildQuery(node.right)
        ]
      }
    case 'NOT':
      return {
        $not: buildQuery(node.value)
      }
    case 'FLAG':
      return {
        [node.value]: true
      }
    case 'EQUALS':
      return {
        [node.key]: buildQuery(node.value)
      }
    case 'GT':
      return {
        [node.key]: {
          $gt: buildQuery(node.value)
        }
      }
    case 'GTE':
      return {
        [node.key]: {
          $gte: buildQuery(node.value)
        }
      }
    case 'LT':
      return {
        [node.key]: {
          $gte: buildQuery(node.value)
        }
      }
    case 'LTE':
      return {
        [node.key]: {
          $gte: buildQuery(node.value)
        }
      }
    case 'INCLUDES':
      return {
        [node.key]: {
          $all: [].concat(buildQuery(node.value))
        }
      }
    case 'ARRAY':
      return node.value.map(function(item) {
        return buildQuery(item);
      });
    case 'STRING':
    case 'NUMBER':
    case 'BOOLEAN':
    case 'NULL':
      return node.value;
  }
}

/**
 * Expose
 */

exports = module.exports = function filter(tree, list) {
  return sift(buildQuery(tree), list);
}