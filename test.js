class Dog {
    constructor(race, age, name){
        this.race = race;
        this.age = age;
        this.name = name;
    }
    changeName(newName){
        this.name = newName;
        return this.name;
    }
    addPuppy(){

    }
}
const addPuppyButton = document.querySelector('.addPuppy');

addPuppyButton.addEventListener("click", (e)=>{
    console.log(e)
})