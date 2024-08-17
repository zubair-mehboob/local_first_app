import Realm, {BSON} from 'realm';

export class Task extends Realm.Object<Task> {
    _id: BSON.ObjectId = new BSON.ObjectId();
    description!: string;
    isCompleted: boolean = false;
    createdAt: Date = new Date()  
    userId!:string;

    static primaryKey = '_id';
    
  }