export function getErrorFromCode(code){
  if(code === "No First Name"){
    return "Please enter a first name";
  }
  if(code === "No Last Name"){
    return "Please enter a last name";
  }
  if(code === "auth/invalid-email"){
    return "Please check that you have entered your email address correctly";
  }
  if(code === "auth/user-not-found"){
    return "We were unable to find a user with that email address";
  }
  if(code === "auth/wrong-password"){
    return "Incorrect password, please try again";
  }
  if(code === "auth/weak-password"){
    return "Please provide a stronger password";
  }
}
