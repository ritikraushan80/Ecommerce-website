const {createProduct, getProducts, filterProducts} = require('../../controller/product')
const { Products } = require('../../models')
const {mockRequest, mockResponse} = require('../interceptor')


describe('Product Controller testing',()=>{

	let req, res;

	beforeEach(()=>{
		req = mockRequest()
		res = mockResponse()
	})

	it('test success createProductController',async ()=>{

		const testPayload = {
			name: 'sony tv',
			description:'About TV',
			cost: 234,
			quantity: 12,
			categoryId: 1
		}

		req.body = testPayload;

		const createProductSpy = jest.spyOn(Products, 'create').mockImplementation(
                          (testPayload) => Promise.resolve(testPayload)
                       );

		await createProduct(req,res)

		expect(createProductSpy).toHaveBeenCalled()
		expect(Products.create).toHaveBeenCalledWith(testPayload);

		expect(res.status).toHaveBeenCalledWith(200)
		expect(res.send).toHaveBeenCalled()
		expect(res.send).toHaveBeenCalledWith(
			{
				"msg": 'Product created Successfully',
				"result" : {
					name: 'sony tv',
					description:'About TV',
					cost: 234,
					quantity: 12,
					categoryId: 1
				}
			 })	
	})

    it('test error createProductController',async ()=>{

		const testPayload = {
			name: 'sony tv',
			description:'About TV',
			cost: 234,
			quantity: 12,
			categoryId: 1
		}

		req.body = testPayload;

		const createProductSpy = jest.spyOn(Products, 'create').mockImplementation(
                          (testPayload) => Promise.reject('hey creation error')
                       );

		await createProduct(req,res)

		expect(createProductSpy).toHaveBeenCalled()
		expect(Products.create).toHaveBeenCalledWith(testPayload);

		expect(res.status).toHaveBeenCalledWith(500)
		expect(res.send).toHaveBeenCalled()
		expect(res.send).toHaveBeenCalledWith(
			{
				"msg": 'Internal server Error',
				"err" : 'hey creation error'
			 })	
	})


    it('test success findAll scenario', async ()=> {

		const spy = jest.spyOn(Products, 'findAll').mockImplementation(()=>{
			return Promise.resolve([{
								name: 'sony tv',
								description:'About TV',
								cost: 234,
								quantity: 12,
								CategoryId: 1
							}])
		})

		await getProducts(req,res)

		expect(spy).toHaveBeenCalled()
		expect(res.status).toHaveBeenCalledWith(201)
		expect(res.send).toHaveBeenCalledWith([{
								name: 'sony tv',
								description:'About TV',
								cost: 234,
								quantity: 12,
								CategoryId: 1
							}])
	})
}) 
 