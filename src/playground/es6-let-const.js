var nameVar = 'Holden';
console.log('nameVar', nameVar);

let nameLet = 'Jen';
nameLet = 'Holden';
console.log('nameLet', nameLet);

const nameConst = 'Frank';
console.log('nameConst', nameConst);

const fullName = 'Holden Monroe';
let firstName;

if (fullName) {
    firstName = fullName.split(' ')[0];
    console.log(firstName);
}

console.log(firstName);