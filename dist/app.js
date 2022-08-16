"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//auto bind decorator
function autobind(target, methodName, descriptor) {
    const origingMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = origingMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
class ProjectInput {
    // titleInputElement: HTMLInputElement;
    constructor() {
        this.templateElement = document.getElementById("project-input");
        this.hostElement = document.getElementById("app");
        const importedNode = document.importNode(this.templateElement.content, true); //method included in global document  pointer =>refernce to templateEelment ,true=> copy of the content between tamplate tag
        this.element = importedNode.firstElementChild;
        this.element.id = "user-input";
        this.titleInputElement = this.element.querySelector("#title");
        this.descriptionInputElement = this.element.querySelector("#description");
        this.peopleInputElement = this.element.querySelector("#people");
        this.configure();
        this.attach();
    }
    gatherUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        //validation 
        if (enteredTitle.trim().length === 0 || enteredDescription.trim().length === 0 || enteredPeople.trim().length === 0) {
            alert('invalid input , please try again');
            return;
        }
        else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }
    clearInputs() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }
    ;
    submitHandler(event) {
        event.preventDefault();
        // console.log(this.titleInputElement.value); //---this here doesnot refer to class but to subnit button becuse we bind it to the event listerner which is to btn
        const userInput = this.gatherUserInput();
        //becouse the user has possible return of undefiend i w'll go for acheck
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            // console.log(title, description, people);
            this.clearInputs();
        }
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler); //this.submitHandler.bind(this)  //=>solution for this ref to bind it // we can use decorator here to auto bind this keyword
    }
    attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element); //default method provided by browser to insert html element 
    }
}
__decorate([
    autobind
], ProjectInput.prototype, "submitHandler", null);
const project = new ProjectInput();
