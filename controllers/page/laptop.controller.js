const productService = require('../../service/productData.service');

module.exports = async (req, res) => {
    res.locals.breadcrumb = [{
        name: 'Trang chủ',
        link: '/',
    }, {
        name: 'Máy tính xách tay'
    }]
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
        let searchOption = req.query.searchId.replace(/list/g,'').split('_');
        let typeOption = req.query.typeId.split('_');
        productData = await productService.getProductData();
        for(let i = 0; i < searchOption.length; i++) {

            // Loc theo hang
            if(searchOption[i] == '1') {
                for(let j = 0; j < productData.length; j++) {
                    if(productData[j].brand === parseInt(typeOption[i])) {
                        data.push(productData[j]);
                    }
                }
            }

            // Loc theo gia
            if(searchOption[i] == '2') {
                if(data.length === 0 && i === 0) {
                    data = await productService.getProductData();
                    data = productService.filterPrice(data, parseInt(typeOption[i]));
                } else {
                    data = productService.filterPrice(data, parseInt(typeOption[i]));
                }
            }
            
            // Loc theo loai hang
            if(searchOption[i] == '3') {
                if(data.length === 0 && i === 0) {
                    data = await productService.getProductData();
                    data = productService.filterProductType(data, parseInt(typeOption[i]));
                } else {
                    data = productService.filterProductType(data, parseInt(typeOption[i]));
                } 
            }

            // Loc theo CPU
            if(searchOption[i] == '4') {
                if(data.length === 0 && i === 0) {
                    data = await productService.getProductData();
                    data = productService.filterCPU(data, parseInt(typeOption[i]));
                } else {
                    data = productService.filterCPU(data, parseInt(typeOption[i]));
                } 
            }

            // Loc theo RAM
            if(searchOption[i] == '5') {
                if(data.length === 0 && i === 0) {
                    data = await productService.getProductData();
                    data = productService.filterRAM(data, parseInt(typeOption[i]));
                } else {
                    data = productService.filterRAM(data, parseInt(typeOption[i]));
                } 
            }
        }
        currentUrl = req.originalUrl.replace('/laptop','').replace('?','');
        currentUrl = currentUrl.replace('&page='+page,'');
        productArray = data.slice(begin, end);
        if(data.length >= 20) {
            res.locals.maxPage = (data.length % 20 === 0) ? Math.round(data.length / 20) : Math.round(data.length / 20) + 1;
        } else {
            res.locals.maxPage = 1;
        }
    } else {
        productData = await productService.getProductData();
        currentUrl = '';
        productArray = productData.slice(begin, end);
        if(productData.length >= 20) {
            res.locals.maxPage = (productData.length % 20 === 0) ? Math.round(productData.length / 20) : Math.round(productData.length / 20) + 1;
        } else {
            res.locals.maxPage = 1;
        }
    }
    res.locals.currentPage = parseInt(page);
    res.locals.product = productArray;
    res.locals.currentUrl = currentUrl;
    res.render('laptop');
}