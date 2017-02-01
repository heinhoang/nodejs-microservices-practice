var http = require('http');
var seneca = require('seneca')();

// // add microservice 'sum'
// seneca.add({role: 'math', cmd: 'sum'}, function(msg, res) {
//     var sum = msg.left + msg.right;
//     res(null, {answer: sum});
// });
// // add microservice 'product'
// seneca.add({role: 'math', cmd: 'product'}, function(msg, res) {
//     var product = msg.left*msg.right;
//     res(null, {answer: product});
// });
// // act an microservice 'sum'
// seneca.act({role: 'math', cmd: 'sum', left: 1, right: 2}, function(err, data) {
//     if(err) {
//         return console.error(err);
//     }
//     console.log(data);
// });
// seneca.act({role: 'math', cmd: 'product', left: 3, right: 4}, console.log);

// seneca.add('inputPattern', (yourInput, yourOutput) => {yourOutput(...)});
// define input pattern, get input array & run output(err, res) from the following act
seneca.add('component:greeter', function(yourInput, yourOutput) {
    yourOutput(null, {message: 'hello ' + yourInput.name}); // output(err, res)
});
// `seneca.act(yourInput, yourOutput);` 
// what you want to input & what you want to output
// provide input array and output(err, res) function so that the above function service can run
seneca.act({component: 'greeter', name: 'David'}, function(err, res) {
    if(err) return console.error(err);
    console.log(res.message);
});

seneca.add('cmd:wordcount', (msg, respond) => {
    var length = msg.phrase.split(' ').length;
    respond(null, {message: 'Word length: '+ length});
});
seneca.act({cmd:'wordcount', phrase: 'Hello world this is Seneca'}, (err, res) => {
    console.log(res.message);
});

var server = http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Hello World\n");
});

server.listen(8000);