router.post(
  "/register",
  validate(registerSchema),
  authController.register
)