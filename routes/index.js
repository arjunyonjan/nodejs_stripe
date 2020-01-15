var express = require('express');
var router = express.Router();

const stripe = require('stripe')('sk_test_diQrl0K1EVdbz0kBmD6za4CC00ckcH68Hm')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//create a card..
router.post('/api/card', (req,res,next)=>{
	const {token} = req.body

	stripe.customers.createSource('cus_GYGcYtSFemB5NF', {source: token.id},(err, card)=>{
		if(err){
			throw err
		}
		console.log("card created successfully", "$$$$");
		res.json({message: "card created successfully"})
	})
})


/*retrieve card...*/
router.get('/api/card', (req,res,next)=>{
})


/*update the card*/
router.put('/api/card', (req,res,next)=>{
	const {token} = req.body

	console.log(token, "put token.....$$$$");

	stripe.customers.update(
		'cus_GYGcYtSFemB5NF',
		{source: token.id},
		(err,customer)=>{

			if(err){
				throw err
			}
			console.log("new card added successfully", "$$$$");

			res.json({message:"card updated successfully"})
		}
	)
})


router.post('/api/payment-method',(req,res,next)=>{

})

module.exports = router;