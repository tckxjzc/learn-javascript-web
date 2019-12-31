

console.log(zango);

let db=new zango.Db('zango_Db_t',{people:['age']});
let people = db.collection('people');


// people.insert([
//     {name:'Todd',age:99},
//     {name:'Frank',age:20}
//     ]).then(function (e) {
//     console.log('insert e %o',e);
// });

setTimeout(function () {
    let f=people.find({name:{$ne:'Todd'}});
    console.log(f);
    f.forEach(function (item) {
        console.log(item)
    });
},1500);