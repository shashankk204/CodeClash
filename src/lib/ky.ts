import ky from "ky"

const kyinst = ky.create({
    parseJson(text){
        JSON.parse(text,(key,value)=>{
            if(key.endsWith("At")) return new Date(value);
            return value;
        })
    }
})


export default kyinst;