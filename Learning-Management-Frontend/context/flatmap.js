let f = 'thisIsTheStringToSplit';
console.log(f.match(/[A-Z][a-z]+|[0-9]+/g).join(" ").toLowerCase())

