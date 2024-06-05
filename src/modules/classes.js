class Item {
    constructor(title, desc, date, priority, checkbox = false) {
        this.title = title;
        this.desc = desc;
        this.date = date;
        this.priority = priority;
        this.checkbox = checkbox;
    }
}

let projectID = 0;

export default class Project {
    constructor(name) {
        this.name = name;
        this.items = [];
        this.id = Project.generateId();
    }

    addItems(title, desc, date, priority, checkbox) {
        let item = new Item(title, desc, date, priority, checkbox);
        this.items.push(item);
    }

    removeItem(position) {
        this.items.splice(position, 1);
    }

    changeItem(position, title, desc, date, priority) {
        let newItem = new Item(title, desc, date, priority);
        this.items.splice(position, 1, newItem);
    }

    getItems() {
        return this.items;
    }

    // Static methods are used for the functionality that belongs to the class “as a whole”. It doesn’t relate to a concrete class instance.
    static generateId() {
        return projectID++;
      }
}