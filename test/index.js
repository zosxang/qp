const { assert } = require('chai');
const qp = require('../index');

describe('qp', () => {
  it('should pass', () => {
    const filtered = qp('x>1', [{ x: 3 }, { x: 1 }, { x: -1 }, { x: '2' }]);
    assert.strictEqual(filtered.length, 2);
  });
});
