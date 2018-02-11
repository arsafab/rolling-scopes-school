export default class Category {
    title: string;
    subitems: Category[] = [];
    tasks: any[] = [];
    toggleState: boolean =  false;
    editState: boolean =  false;

    constructor(str: string) {
        this.title = str;
    }
}
