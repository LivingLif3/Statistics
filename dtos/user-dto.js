module.exports = class UserDto {
  name;
  surname;
  lastname;
  email;
  id;
  isActivated;
  role;
  team;
  available;
  age;
  height;
  weight;
  img;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.name = model.name;
    this.surname = model.surname;
    this.lastname = model.lastname;
    this.role = model.role;
    this.team = model.team;
    this.available = model.available;
    this.age = model.age;
    this.height = model.height;
    this.weight = model.weight;
    this.img = model.img;
  }
};
