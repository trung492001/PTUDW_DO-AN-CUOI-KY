const productService = require('../../service/productData.service');
const categoryService = require('../../service/category.service');
const sortService = require('../../service/sort.service');

module.exports = async (req, res) => {
    let productData = [];
    let currentUrl;
    let productArray = [];

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const productPerPage = 20;
    const begin = (page - 1) * productPerPage;
    const end = page * productPerPage;

    const brandData = await categoryService.getCategoryByBrand(req.query.brandId);
    console.log(brandData);
    if(req.query.searchId) {
        let searchOption = req.query.searchId.replace(/list/g,'').split('_');
        let typeOption = req.query.typeId.split('_');
        productData = await productService.getProductByBrand(req.query.brandId);
        for(let i = 0; i < searchOption.length; i++) {
            // Loc theo gia
            if(searchOption[i] == '1') {
                productData = productService.filterPrice(productData, parseInt(typeOption[i]));
            }

            // Loc theo loai hang
            if(searchOption[i] == '2') {
                productData = productService.filterProductType(productData, parseInt(typeOption[i]));
            }

            // Loc theo CPU
            if(searchOption[i] == '3') {
                productData = productService.filterCPU(productData, parseInt(typeOption[i]));
            }

            // Loc theo RAM
            if(searchOption[i] == '4') {
                productData = productService.filterRAM(productData, parseInt(typeOption[i]));
            }
        }
        currentUrl = req.originalUrl.replace('/category','').replace('?','');
        currentUrl = currentUrl.replace('&page='+page,'');
        if(req.query.sort == 1) {
            productData = sortService.sortAscending(productData);
        } else if (req.query.sort == 2){
            productData = sortService.sortDescending(productData);
        }
        productArray = productData.slice(begin, end);
    } else {
        productData = await productService.getProductByBrand(req.query.brandId);
        if(req.query.sort == 1) {
            productData = sortService.sortAscending(productData);
        } else if (req.query.sort == 2){
            productData = sortService.sortDescending(productData);
        }
        currentUrl = 'brandId='+req.query.brandId;
        productArray = productData.slice(begin, end);
    }

    if(productData.length >= 20) {
        res.locals.maxPage = (productData.length % 20 === 0) ? Math.round(productData.length / 20) : Math.round(productData.length / 20) + 1;
    } else {
        res.locals.maxPage = 1;
    }
    res.locals.brandData = brandData;
    res.locals.currentPage = parseInt(page);
    res.locals.product = productArray;
    res.locals.currentUrl = currentUrl;
    res.render('category');
}