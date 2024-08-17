import { TaskDTO } from "@/dto/Task";
import { Task } from "@/models/Task";
import { useQuery, useRealm } from "@realm/react"

export const useTask = () => {
const realm = useRealm();
const tasks = useQuery(Task);
const createDBTask = (task: TaskDTO) => {
    realm.write(() => {
        realm.create(Task,task)
    })
}
const deleteDBTask = (task:Task ) => {
    realm.write(() => {
        realm.delete(task);
    })
}

const updateDBTask = (task : Task, description:string | undefined) => realm.write(() => {
    task.description = description; 
})

return {createDBTask, tasks, deleteDBTask, updateDBTask}
}