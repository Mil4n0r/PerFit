const express = require('express');
//const passport = require('passport');
const router = express.Router();

const SubscriptionModel = require('../../models/SubscriptionSchema');

const { checkPermissionsSubscription } = require('../../auth/checkPermissions');

// Lista de actividades
router.get("/subscription/list", async (req, res, next) => {
	//passport.authenticate("jwt", {session: false}, (err, user, info) => {
		/*if(err) {
			next(err);
		}
		else if(!user) {
			const error = new Error(info.message)
			next(error);
		}
		else {
			SubscriptionModel.find((err, activities) => {
				if(err) {
					next(err);	
				} 
				else {
					res.json(activities);	
				}
			});
		}
		*/
		SubscriptionModel.find((err, activities) => {
			if(err) {
				next(err);	
			} 
			else {
				res.json(activities);	
			}
		});
	//})(req,res,next);
});

module.exports = router;