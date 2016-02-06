/**
 * Created by rharik on 11/1/15.
 */

module.exports = function(R, _fantasy, buffer) {
var Maybe = _fantasy.Maybe;
var safeProp = R.curry((x,o) => o ? Maybe(o[x]) : Maybe.Nothing() );
var startsWith  = R.curry((x,s) => s.startsWith(x) );
var parseBuffer = x => buffer.Buffer.isBuffer(x) ? tryParseJSON(x.toString('utf8')) : Maybe.Nothing() ;
var tryParseJSON = x => { try { return Maybe.of(JSON.parse(x)); }
                        catch (e) { return Maybe.Nothing(); } };
var log     = (x) => {
    console.log('==========log=========');
    console.log(x);
    console.log('==========ENDlog=========');
    return x;
};
var logPlus     = R.curry((y,x) => {
    console.log('==========log '+y+'=========');
    console.log(x);
    console.log('==========ENDlog '+y+'=========');
    return x;
});
var logForkPlus = R.curry((y,x)  => {
    var fr, sr;
    x.fork(f=> {
            console.log('==========log failure ' + y + '=========');
            console.log(f);
            console.log('==========ENDlog failure ' + y + '=========');
            fr = f;
        },
            s=> {
            console.log('==========log success ' + y + '=========');
            console.log(s);
            console.log('==========ENDlog success ' + y + '=========');
            sr = s;
        });

    return sr ? Future((rej, res)=> res(sr)) : Future((rej, res)=> rej(fr));
});
var logFork = x  => {
    var fr, sr;
    x.fork(f=> {
            console.log('==========log failure=========');
            console.log(f);
            console.log('==========ENDlog failure=========');
            fr = f;
        },
            s=> {
            console.log('==========log success=========');
            console.log(s);
            console.log('==========ENDlog success=========');
            sr = s;
        });

    return sr ? Future((rej, res)=> res(sr)) : Future((rej, res)=> rej(fr));
};

return {
    safeProp,
    startsWith,
    parseBuffer,
    tryParseJSON,
    log,
    logPlus,
    logFork,
    logForkPlus
}
};
