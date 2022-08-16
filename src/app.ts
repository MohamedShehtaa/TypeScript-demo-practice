//auto bind decorator
function autobind(target: any, methodName: string, descriptor: PropertyDescriptor) {  //=> method decorator
    const origingMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = origingMethod.bind(this);
            return boundFn;
        }

    };
    return adjDescriptor;
}

class ProjectInput {
    templateElement: HTMLTemplateElement;  // this type is available becouse i write dom inside lib[] in conifg file
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;
    // titleInputElement: HTMLInputElement;

    constructor() {
        this.templateElement = document.getElementById("project-input")! as HTMLTemplateElement;
        this.hostElement = document.getElementById("app")! as HTMLDivElement;
        const importedNode = document.importNode(this.templateElement.content, true); //method included in global document  pointer =>refernce to templateEelment ,true=> copy of the content between tamplate tag
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = "user-input";
        this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector("#description") as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector("#people") as HTMLInputElement;
        this.configure();
        this.attach();
    }
    private gatherUserInput(): [string, string, number] | void { // return tuple
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        //validation 
        if (enteredTitle.trim().length === 0 || enteredDescription.trim().length === 0 || enteredPeople.trim().length === 0) {
            alert('invalid input , please try again');
            return;
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }

    private clearInputs() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    };
    @autobind
    private submitHandler(event: Event) {
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
    private configure() {
        this.element.addEventListener('submit', this.submitHandler); //this.submitHandler.bind(this)  //=>solution for this ref to bind it // we can use decorator here to auto bind this keyword
    }
    private attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element);//default method provided by browser to insert html element 
    }
}

const project = new ProjectInput();