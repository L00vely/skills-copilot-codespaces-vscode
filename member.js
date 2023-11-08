function skillsMember() {
    var member = {
        name: "John",
        age: 30,
        skills: ["JavaScript", "HTML", "CSS"],
        salary: 4000,
        address: {
            city: "New York",
            country: "USA"
        },
        getSalary: function () {
            return this.salary;
        },
        setSalary: function (newSalary) {
            this.salary = newSalary;
        }
    };
    console.log(member);
    console.log(member.name);
    console.log(member.skills);
    console.log(member.skills[0]);
    console.log(member.skills[1]);
    console.log(member.skills[2]);
    console.log(member.address);
    console.log(member.address.city);
    console.log(member.address.country);
    console.log(member.getSalary());
    member.setSalary(5000);
    console.log(member.getSalary());
}