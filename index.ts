// 1 - void
type estatisticas = string | number 
function show(ets:estatisticas):void{
    console.log(`Gols da noite: ${ets}`);
};
show(10);

//--------------------------------------------------------------------------
// 2 - callback com argumento
function greeting(name:string):string {
    return `olá ${name}`; 
};


function preGreeting(f: (name:string) => string, userName:string){
    console.log("Preparando a função");

    const greet = f(userName);
    
    console.log(greet);
};

preGreeting(greeting, "Hallyson");


function personAge( age:number):number {
    return age;
};

function preAge(f: (age:number) => number, idade:number){
    console.log("Função sendo preparada");

    const adult = f(idade);
    console.log(adult);
}


//--------------------------------------------------------------------------
// 3 generic functions
/*- o tipo de retorno é relacionado ao tipo de argumento
- ex: um array pode ser :string, bollena ou number;
- normalmente são utilizados LETRAS COMO T ou U para definir genercs

*/

function firstElement<T>(arr: T[]):T {
    return arr[0];
};

console.log(firstElement([1,2,3]));
console.log(firstElement(["boston", "warriors", "dallas merevics"]));
console.log(firstElement([true, true, false]));
//console.log(firstElement("teste"));


function unionObjects <U,T>(obj1:U, obj2: T){
    return {
        ...obj1,
        ...obj2

    }
};

const newObject = unionObjects( {name:"Hallyson"} ,{age:30, job:"Futebolista"});
console.log(newObject);

function soccerTeamColors <N,U,T,W> (name:N, c1: U, c2:T, c3:W ){
    return{
        name,
        ...c1,
        ...c2,
        ...c3
    } 
};

const team = soccerTeamColors( { name:"CORES DO SÃO PAULO F.C"}, {c1:"vermelho"}, {c2:"preto"},{c3:"branco"});
console.log(team);


//--------------------------------------------------------------------------
// 4 - CONSTRAINT 
// quando temos que criar
function biggestNumber < T extends number | string >(a:T, b:T): T {
    let biggest: T 
    //CHECK O MAIOR NUMBER/STRING
    if(+a > +b){
        biggest = a; 
    } else {
        biggest = b;
    }

    return biggest;
};

console.log(biggestNumber(10,100));
console.log(biggestNumber("10","100"));

//--------------------------------------------------------------------------

// 5 - Especificar tipo de argumento
// quando usamos pronto(uma biblioteca de terceiros e temos que adaptar)
function mergeArray<t>(arr1: t[], arr2: t[]) {
    return arr1.concat(arr2);
};

console.log(mergeArray([1,2,3],[4,5] ));
console.log(mergeArray < number | string > ( [1,2,3],["São paulo fc", "Maior do brasil"] ));

//--------------------------------------------------------------------------
// 6 - parâmetros opcionais

function modernGreeting(name:string, greet?:string){

    if(greet){
        return `Olá ${greet} ${name}, tudo bem ?`
    }

    return `olá ${name}, tudo bem?`
};

console.log(modernGreeting("Hallyson"));
console.log(modernGreeting("Hallyson", "Dr."));
//--------------------------------------------------------------------------

// 7 - parâmetro default
function sumDefault(n:number, m = 10 ){
    return n+m;
};
console.log(sumDefault(10,100));
console.log(sumDefault(10));
//--------------------------------------------------------------------------
/* 8 - unknown é semelhando ao any, ele aceita qualquer tipo de dado;
- porém não deixa algo ser executado se não for validado;
*/
function esperar(x:unknown){

    if(Array.isArray(x)){ // method check for array
       console.log(x[0]);
    } else if( typeof x === "string"){
        console.log("X é uma string");
    } else if(typeof x === "number"){
        console.log("X é um number");
    }
};
const arr = [ "olá mundo"]; 

esperar(["string",2,true,arr]);
esperar("tricolor paulista");
esperar(1140);
//--------------------------------------------------------------------------
/* 9 - type never 
- semelhante ao void, é utilizado quando a function não retorna nada;
- exemplos: retorno de erros(bug no sistema);
*/

function showErrorMessage(msg:string): never{
    throw new Error(msg);
};

//showErrorMessage('pane no sistema');

//------------------------------------------------------------------------

/*10 - Rest operator com TS
- para utilizar basta DEFINIR O TIPO DE DADO COM A SINTAXE REST
*/
function sumAll(...n:number[]){
    return n.reduce( (number, sum) => sum + number)
};

console.log(sumAll(12,55,88,99,77));
console.log(sumAll(10,10,20,20));
//console.log(sumAll('test'));

//------------------------------------------------------------------------
// 11 - destructuring em parâmetros
//determinar O TIPO DE CADA DADO QUE SERPA DESESTRUTURADO;
//funciona com OBJETOS E ARRAYS


function showProduct( {name, price}: {name:string, price:number} ):string {
    return `O nome do produto é: ${name}, ele custa R$ ${price} `
};
const camisa = {name:"seaway", price:79.99};
console.log(showProduct(camisa));
console.log(showProduct({name: "casa", price:10}));
// ERROR: console.log(showProduct({name: "Hallyson", age:27}));


