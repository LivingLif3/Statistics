module.exports = class UserDto {
    name;
    surname;
    lastname;
    email;
    id;
    isActivated;
    role;

    constructor(model) {
        this.email = model.email
        this.id = model._id
        this.isActivated = model.isActivated
        this.name = model.name
        this.surname = model.surname
        this.lastname = model.lastname
        this.role = model.role
    }
}