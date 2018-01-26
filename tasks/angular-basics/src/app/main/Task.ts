export default class Task {
    title: string;
    description: string;
    isDone: boolean = false;
    categoryTitle: string;

    constructor(title: string, categoryTitle: string) {
        this.title = title;
        this.categoryTitle = categoryTitle;
    }
}
