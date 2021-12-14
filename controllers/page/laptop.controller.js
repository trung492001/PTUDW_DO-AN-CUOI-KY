const productService = require('../../service/productData.service');

module.exports = async (req, res) => {
    let productData = [];
    let currentUrl;
    let data = [];
    let productArray = [];
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const productPerPage = 20;
    const begin = (page - 1) * productPerPage;
    const end = page * productPerPage;

    if(req.query.searchId) {
        let searchOption = req.query.searchId.replaceAll('list','').split('_');
        let typeOption = req.query.typeId.split('_');
        console.log(searchOption);
        productData = await productService.getProductData();
        for(let i = 0; i < searchOption.length; i++) {
            if(searchOption[i] == '1') {
                for(let j = 0; j < productData.length; j++) {
                    if(productData[j].brand === parseInt(typeOption[i])) {
                        data.push(productData[j]);
                    }
                }
            }
            if(searchOption[i] == '2') {
                if(data === []) {
                    data = await productService.getProductData();
                    data = productService.filterPrice(data, parseInt(typeOption[i]));
                } else {
                    data = productService.filterPrice(data, parseInt(typeOption[i]));
                }
            }
        }
        currentUrl = req.originalUrl.replace('/laptop','').replace('?','');
        currentUrl = currentUrl.replace('&page='+page,'');
        productArray = data.slice(begin, end);
    } else {
        productData = await productService.getProductData();
        currentUrl = '';
        productArray = productData.slice(begin, end);
    }

    res.locals.currentPage = parseInt(page);
    res.locals.product = productArray;
    res.locals.currentUrl = currentUrl;
    res.render('laptop');
}