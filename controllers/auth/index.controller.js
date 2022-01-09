const productService = require('../../service/productData.service');
module.exports.get = async (req, res) => {
    const productData = await productService.getRandomProduct(10);
    res.locals.product = productData;
    res.render('index');
}

module.exports.post = async(req,res) => {
    let hint = "";
    let searchQ = req.body.query.toLowerCase();
    if(searchQ.length > 0){
        const results = await productService.getProductData();
        results.forEach(function(result){
            const name = result.name.toLowerCase();
            if (name.includes(searchQ)){
                if(hint === "")
                    hint = `
                            <a href="/detailLaptop?productId=${result._id}" class="flex flex-col lg:flex-row items-center justify-between space-x-1 bg-white hover:bg-gray-300 px-2">
                                <img src="/images/${result.thumbnail[0]}" class="w-20 h-20 block relative">
                                <p class="text-sm lg:text-base"> ${result.name}</p>
                                <p class="text-base pr-2 text-red-500"> ${result.price} ₫</p>
                            </a>`
                else
                    hint = hint + `<a href="/detailLaptop?productId=${result._id}" class="flex flex-col lg:flex-row items-center justify-between space-x-1 bg-white hover:bg-gray-300 px-2">
                                        <img src="/images/${result.thumbnail[0]}" class="w-20 h-20 block relative">
                                        <p class="text-sm lg:text-base"> ${result.name}</p>
                                        <p class="text-base pr-2 text-red-500"> ${result.price} ₫</p>
                                    </a>`
            }
       })
    }
    res.send({response: hint});
}