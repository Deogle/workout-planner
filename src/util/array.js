const arraysMatch = function(arr1,arr2,fn){
    //if(arr1 === undefined || arr2 === undefined) return false;
    if(arr1.length !== arr2.length) return false;
    for(var i = 0; i < arr1.length; i++){
        //apply comparison function
        if(!fn(arr1[i],arr2[i])) return false;
    }
    return true;
}

module.exports = {
    arraysMatch
}