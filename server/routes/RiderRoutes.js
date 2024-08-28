 
// import express from 'express'; 
// import authMiddleware from '../middlewares/authMiddleware.js';
// import { loginRider, registerRider, upload } from '../controllers/riderController.js';

 
// const router = express.Router();

// // Route for user registration
// router.post('/register', upload.fields([{ name: 'marksheet' }, { name: 'image' }, { name: 'checkBook' }]), registerRider);

// // Route for user login
// router.post('/login', loginRider);

// // Route to get authenticated user's information
// router.get('/user', authMiddleware, (req, res) => {
//     res.status(200).json(req.user);
// });

// export default router;


 
import express from 'express'; 
import authMiddleware from '../middlewares/authMiddleware.js';
import { loginRider, registerRider, upload } from '../controllers/riderController.js';

 
const router = express.Router();

// Route for user registration
router.post('/register', upload.fields([{ name: 'marksheet' }, { name: 'image' }, { name: 'checkBook' }]), registerRider);

// Route for user login
router.post('/login', loginRider);

// Route to get authenticated user's information
router.get('/user', authMiddleware, (req, res) => {
    res.status(200).json(req.user);
});

export default router;