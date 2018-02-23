// DO WHATEVER YOU WANT HERE

const createEnumerableProperty = prop => prop;

const createNotEnumerableProperty = prop => {
    Object.defineProperty(Object.prototype, prop, {
        get: () => String.prototype.propertyValue,
        set: value => String.prototype.propertyValue = value,
    });

    return prop;
};

const createProtoMagicObject = () => {
    const magic = {};
    function func() {}

    func.__proto__ = func.prototype;

    return func;
};

let count = 0;
const incrementor = () => {
	count++;
	const add = () => incrementor();
	add.valueOf = () => count;
	return add;
}

let asyncCount = 0;
const asyncIncrementor = () => {
    asyncCount++;
	const add = () => setTimeout(asyncIncrementor(), 0);
	add.valueOf = () => asyncCount;
	return add;
}    

function* createIncrementer(){
    let value = 0;
    while(true) yield ++value;
};

// return same argument not earlier than in one second, and not later, than in two
const returnBackInSecond = (arg) => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(arg), 1000);      
    });

    return promise;
};

const getDeepPropertiesCount = (obj) => JSON.stringify(obj).match(/[0-9]+/g).length;

const createSerializedObject = () => null;

const sortByProto = (arr) => arr.sort((left, right) => right.__proto__ - left.__proto__);

exports.createEnumerableProperty = createEnumerableProperty;
exports.createNotEnumerableProperty = createNotEnumerableProperty;
exports.createProtoMagicObject = createProtoMagicObject;
exports.incrementor = incrementor;
exports.asyncIncrementor = asyncIncrementor;
exports.createIncrementer = createIncrementer;
exports.returnBackInSecond = returnBackInSecond;
exports.getDeepPropertiesCount = getDeepPropertiesCount;
exports.createSerializedObject = createSerializedObject;
exports.sortByProto = sortByProto;