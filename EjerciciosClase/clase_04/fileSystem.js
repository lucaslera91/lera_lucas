var fs = require('fs')
fs.appendFileSync('primerText3.txt', 'Hola', function (err){
    if (err) throw err;
    console.log('Done!')
})

fs.open('./primerTexto.txt', 'w', function (err){
    if (err) throw err;
    console.log('Done!')
})

fs.writeFileSync()

fs.appendFileSync()

fs.writeFileSync('./segundtoTexto.txt', 'Testos', )