import {
	getKeyType,
	mapObject,
	mergeObjects,
	getNewRandomArrayElement,
	getRandomArrayElement,
	getRandomNumber,
} from './utils.js';

describe('getKeyType(string)', () => {
	describe('return "white"', () => {
		test('if natural key', () => {
			expect(getKeyType('C3')).toEqual('white')
		})
	})

	describe('return "black"', () => {
		test('if flat key', () => {
			expect(getKeyType('C3b')).toEqual('black')
		})

		test('if unescaped sharp', () => {
			expect(getKeyType('C3#')).toEqual('black')
		})

		test('if escaped sharp', () => {
			expect(getKeyType('C3\#')).toEqual('black')
		})
	})
})

describe('mapObject(object / objectArray, fn)', () => {
	describe('passed object', () => {
		it('should call fn for every item in object', () => {
			const fn = jest.fn();
			const object = {one: 1, two: 2, three: 3};

			mapObject(object, fn)
			expect(fn).toHaveBeenCalledTimes(3)
		})

		it('should return array with results of fn(key, value)', () => {
			const fn = (key, value) => {
				return value * 2;
			}
			const object = {one: 1, two: 2, three: 3};

			const targetResults = [2, 4, 6];
			const results = mapObject(object, fn)
			expect(results).toEqual(targetResults)
		})
	})

	describe('passed array of objects', () => {
		it('should call fn for every item in objects', () => {
			const fn = jest.fn();
			const objectArray = [{one: 1, two: 2, three: 3}, {four: 4, five: 5, six: 6}];

			mapObject(objectArray, fn)
			expect(fn).toHaveBeenCalledTimes(6)
		})

		it('should return array with results of fn(key, value)', () => {
			const fn = (key, value) => {
				return value * 2;
			}
			const objectArray = [{one: 1, two: 2, three: 3}, {four: 4, five: 5, six: 6}];

			const targetResults = [2, 4, 6, 8 , 10, 12];
			const results = mapObject(objectArray, fn)
			expect(results).toEqual(targetResults)
		})
	})
})

describe('mergeObjects(objectsArray)', () => {
	it('should return merged object', () => {
		const objectArray = [{one: 1, two: 2, three: 3}, {four: 4, five: 5, six: 6}]; 
		
		const results = mergeObjects(objectArray);
		const targetObj = {one: 1, two: 2, three: 3, four: 4, five: 5, six: 6};


		expect(results).toEqual(targetObj)
	})
})

describe('getNewRandomArrayElement(allElements, oldElement = null)', () => {
	it('should return random array element', () => {
		const array = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

		const results = [];

		for(let i = 0; i < 100000; i++) {
			results.push(getNewRandomArrayElement(array))
		}

		array.forEach(el => {
			expect(results.indexOf(el)).not.toEqual(-1)
		}) 
	})

	it('should not return old element', () => {
		const array = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
		const oldElement = 'a';
		const results = [];

		for(let i = 0; i < 100000; i++) {
			const result = getNewRandomArrayElement(array, oldElement);

			expect(result).not.toEqual(oldElement)
		} 
	})
})

describe('getRandomArrayElement(array)', () => {
	it('should return random array element', () => {
		const array = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

		const results = [];

		for(let i = 0; i < 100000; i++) {
			results.push(getRandomArrayElement(array))
		}

		array.forEach(el => {
			expect(results.indexOf(el)).not.toEqual(-1)
		})
	})
})

describe('getRandomNumber(range)', () => {
	it('should return random number between 0 and range', () => {
		const range = 10;
		let results = [];

		for(let i = 0; i < 100000; i++) {
			results.push(getRandomNumber(range))
		}

		for(let i = 0; i <= range; i++) { 
			expect(results.indexOf(i)).not.toEqual(-1)
		}

		const filteredResults = results.filter(num => num >= 0 && num <= range)

		expect(results.length).toEqual(filteredResults.length)
	})
})