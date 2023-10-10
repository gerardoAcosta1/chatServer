const {Router} = require('express');
const {registerUser, loginUser, validateEmail, getAllUsers} = require('./user.controllers');
const authenticate = require('../../middelwares/auth.middleware');
const { registerUserValidator, loginValidator } = require('./user.validator');

const router = Router();

router
  .route("/")
  .get(authenticate, getAllUsers)
  .post(registerUserValidator, registerUser)
  .get(authenticate, (req, res) => {
    res.json({ message: "aqui van tus mensajes" });
  });

router.post("/login", loginValidator, loginUser);

router.post("/validate", validateEmail);

module.exports = router;