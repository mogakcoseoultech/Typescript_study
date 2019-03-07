let tuple1: [number, string] = [14109388, 'Hong'];
const tuple2: [number, string] = [14109388, 'Hong'];

tuple1[0] = 13109388;
tuple2[0] = 13109388;

console.log(tuple1);
console.log(tuple2);