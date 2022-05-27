function shortenURL(){
    const selections = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const newSelections = selections.split('')
    // console.log(newSelections)
    let newURL = ''
    for(let i=0 ; i<5 ; i++){
        let index = Math.floor(Math.random() * newSelections.length)
        newURL += newSelections[index]
    }
    return newURL
}
module.exports = shortenURL