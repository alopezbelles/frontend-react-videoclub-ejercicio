export const errorCheck = (value, type, password1) => {
  switch (type) {
    case "text":
      if (!/[a-z]/gi.test(value)) {
        return "Incorrect format";
      } else {
        return "";
      }

    case "name":
      if (value === "") {
        return "Name cannot be empty";
      } else if (!/[a-z]/gi.test(value)) {
        return "Incorrect format";
      } else {
        return "";
      }

    case "email":
      if (
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        )
      ) {
        return "Write a valid email";
      } else {
        return "";
      }

    case "password":
      if (value.length < 8) {
        return "Password must contain at least 8 characters";
      }
      // validate it has one lower case letter
      if (!value.match(/[a-z]/)) {
        return "Password must contain at least one lowercase";
      }
      // validate it has one upper case letter
      if (!value.match(/[A-Z]/)) {
        return "Password must contain at least one uppercase";
      }
      // validate it has one number
      if (!value.match(/[0-9]/)) {
        return "Password must contain at least one number";
      } else {
        return "";
      }

    case "password2":
      if (value !== password1) {
        return "Passwords don't match";
      } else {
        return "";
      }

    default:
      console.log("Error");

      break;
  }
};

