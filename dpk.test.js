const { deterministicPartitionKey, createHash } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the literal '0' when given falsy input", () => {
    for (const falsyInput of [
      null,
      undefined,
      '',
      0,
      false,
    ]) {
      const falsyKey = deterministicPartitionKey(falsyInput);
      expect(falsyKey).toBe("0");
    }
  });

  describe("Input with partitionKey", () => {
    it("partitionKey is used when it's a non-empty string", () => {
      for (const partitionKey of [
        'a',
        'another_key',
        'yet_another_key',
        'slightly larger input string,'
      ]) {
        const key = deterministicPartitionKey({ partitionKey });
        expect(key).toBe(partitionKey);
      }
    });

    it("partitionKey is hashed when it's a string with length larger than 256", () => {
      const justRightPartitionKey = Array(256).fill('a').join('');
      const key1 = deterministicPartitionKey({ partitionKey: justRightPartitionKey });
      expect(key1).toBe(justRightPartitionKey);

      const largePartitionKey = Array(257).fill('a').join('');
      const key2 = deterministicPartitionKey({ partitionKey: largePartitionKey });
      expect(key2).toBe(createHash(largePartitionKey));
      expect(key2.length).toBeLessThanOrEqual(256);
    });

    describe("partitionKey is stringified when it's an object", () => {
      const testInput = partitionKey => {
        expect(deterministicPartitionKey({ partitionKey })).toBe(JSON.stringify(partitionKey));
      };
  
      it('number input', () => {
        testInput(1);
      });
  
      it('object input', () => {
        testInput({ buzz: { fizz: 'wat' } });
      });
  
      it('mixed array input', () => {
        testInput([1, '2', -34, Math.abs, function sub(a, b) { return a - b }, true, false, null],);
      });
  
      it('resolved promise', () => {
        testInput(Promise.resolve('success'),);
      });
  
      it('boolean', () => {
        testInput(true);
      });
    });
  });

  describe("Returns stringified input when partitionKey is not provided", () => {
    const testInput = input => {
      expect(deterministicPartitionKey(input)).toBe(JSON.stringify(input));
    };

    it('number input', () => {
      testInput(1);
    });

    it('string input', () => {
      testInput('yet one more string input');
    });

    it('object input', () => {
      testInput({ buzz: { fizz: 'wat' } });
    });

    it('mixed array input', () => {
      testInput([1, '2', -34, Math.abs, function sub(a, b) { return a - b }, true, false, null],);
    });

    it('resolved promise', () => {
      testInput(Promise.resolve('success'),);
    });

    it('boolean', () => {
      testInput(true);
    });
  });

  it("Returned key's length is always 256 at most", () => {
    const largeArray = Array(10000).fill('A large array indeed');

    const key1 = deterministicPartitionKey(largeArray);
    expect(key1.length).toBeLessThanOrEqual(256);

    const key2 = deterministicPartitionKey({ partitionKey: largeArray });
    expect(key2.length).toBeLessThanOrEqual(256);

    expect(key1).toBe(key2);
  });
});
