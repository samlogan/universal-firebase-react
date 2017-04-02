export function getErrorFromCode(code) {
  switch (code) {
    case 'No First Name':
      return 'Please enter a first name';
    case 'No Last Name':
      return 'Please enter a last name';
    case 'auth/invalid-email':
      return 'Please check that you have entered your email address correctly';
    case 'auth/user-not-found':
      return 'We were unable to find a user with that email address';
    case 'auth/wrong-password':
      return 'Incorrect password, please try again';
    case 'auth/weak-password':
      return 'Please provide a stronger password';
    case 'auth/email-already-in-use':
      return 'The email address belongs to another account';
    default:
      return 'Oop, something went wrong';
  }
}
