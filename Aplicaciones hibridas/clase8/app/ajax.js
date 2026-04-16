function A() {
    console.log("A")

}
function tareaB() {
    return new Promise( (resolve, reject) => {
        const ok = false
        // for( let i = 0; i < 1000000000000000000000 ; i++ ){}  //Worker
        if( ok ){
            resolve("B")
            // console.log("B")
        }else{
            reject( "B :(" )
            // console.log("B :(")
        }
    } )
}

async function B(){
    try {        
        const resultado = await tareaB()
        console.log(resultado)
    } catch (error) {
        console.log(error)   
    }
}

function C() {
    console.log("C")
}

A()
B()
C()