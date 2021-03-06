import rename = require('rename');

rename();                       // $ExpectError
rename('a.js');                 // $ExpectError
rename(undefined, undefined);   // $ExpectError
rename(1, 2);                   // $ExpectError
rename('a.js', () => { });       // $ExpectError
rename('a.js', (obj) => { });    // $ExpectError
rename({ non: "existent" }, 'b.js'); // $ExpectError

rename('a.js', 'b.js');         // $ExpectType FilePath
rename('a.js', { suffix: '-debug' });
rename('a.js', (fileObject) => {
    return { suffix: '-debug' };
});

rename({}, 'b.js');
rename({ basename: 'a', extname: '.js' }, 'b.js');

function transformer(obj: rename.FileObject): rename.Specification {
    return {
        suffix: obj.hash || '-debug'
    };
}

rename({ basename: 'a', extname: '.js' }, transformer);
rename({ basename: 'a', extname: '.js', hash: '-123' }, transformer);

rename({
    basename: 'c',
    extname: '.js',
    hash: '111'
}, {
        // tslint:disable-next-line no-invalid-template-strings
        suffix: '-${hash}'
    });

rename.parse();                 // $ExpectError
rename.parse({});               // $ExpectError
rename.parse("p.js");

rename.stringify();             // $ExpectError
rename.stringify("abcd.js");    // $ExpectError
rename.stringify({});
rename.stringify({ suffix: ".js" }); // $ExpectError
rename.stringify({ extname: ".js" });
