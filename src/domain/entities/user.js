
class User
{
  constructor(id,firstName,lastName,email,age,isAdmin,role,password)
  {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.age = age;
      this.password = password;
      this.isAdmin = isAdmin;
      this.role = role;
  }
}

export default User;