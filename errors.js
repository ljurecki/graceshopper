module.exports = {
    ProductExistsError: (title) => `A Product with title ${title} already exists`,
    ProductNotFoundError: (id) => `Activity ${id} not found`,
    UnauthorizedError: () => "You must be logged in to perform this action",
    UserDoesNotExistError: (name) => `User ${name} does not exist`,
    PasswordTooShortError: () => `Password Too Short!`,
    UserTakenError: name => `User ${name} is already taken.`
  }
  