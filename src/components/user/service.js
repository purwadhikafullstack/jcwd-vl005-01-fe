import { product } from "../../../../jcwd-vl005-01-be/src/controllers"


const service = {
    getData: () => {
        return new Promise((resolve,reject)=>{
            resolve({
                count: product.length, 
                data: product
            })
        });
    }
}