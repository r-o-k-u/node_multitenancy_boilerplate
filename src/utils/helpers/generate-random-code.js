const { generate } =require( 'randomstring');

module.exports =  (length) => generate({ length, charset: 'numeric' });