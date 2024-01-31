import * as Dialog from '@radix-ui/react-dialog';
import { ChangeEvent, useState } from 'react';

// interface é como um template dos dados e seus tipos que serão usados na aplicação
interface TaskItem {
    title: string;
    description: string
}

function TaskApp() {
    const [taskList, setTaskList] = useState<TaskItem[]>([
        {
            title: "Aprender sobre React Hooks",
            description: "useState e useEffect"
        },
        {
            title: "Realizar o CRUD do React",
            description: "create, read, update & delete"
        },
        {
            title: "Realizar o deploy do projeto",
            description: "usar o Netlify"
        }
    ])
    const [newTask, setNewTask] = useState({
        title: "",
        description: ""
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value })
    }

    const handleNewTask = () => {
        const newTaskItem: TaskItem = {
            title: newTask.title,
            description: newTask.description
        }

        setTaskList([...taskList, newTaskItem])

        setNewTask({
            title: "",
            description: ""
        })
    }

    const handleDoneTask = (selectedTask: number) => {
        const newTaskList = taskList.filter((_, index) => selectedTask !== index)

        setTaskList(newTaskList)
    }

    const renderTaskList = taskList.map((task, index) => {
        return (
            <div key={index} className="flex items-center mt-6">
                <button className="bg-violet-300" onClick={() => handleDoneTask(index)}>Feito</button>
                <p className="pl-3.5 text-base font-medium text-white">
                    {task.title} ::
                </p>
                <span className="pl-3.5 text-base text-white">
                    {task.description}
                </span>
            </div>
        )
    })

    return (
        <div>
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <button className="bg-violet-900 text-white rounded font-medium">
                        Adicionar tarefa
                    </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay />
                    <Dialog.Content data-testId="modal" className="fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white p-6">
                        <Dialog.Title className="text-lg font-medium">
                            Adicionar nova tarefa
                        </Dialog.Title>
                        <Dialog.Description className="mt-2 mb-6 text-base">
                            Insira informações nos campos abaixo. Clique em "Salvar tarefa" quando terminar.
                        </Dialog.Description>
                        <fieldset className="mb-4 flex items-center gap-5">
                            <label className="w-24 text-right text-base" htmlFor="taskTitle">
                                Tarefa
                            </label>
                            <input
                                className="h-9 w-full rounded px-2 text-base shadow-[0_0_0_1px]"
                                id="taskTitle"
                                name="title"
                                value={newTask.title}
                                placeholder="Insira uma tarefa"
                                onChange={handleChange}
                            />
                        </fieldset>
                        <fieldset className="mb-4 flex items-center gap-5">
                            <label className="w-24 text-right text-base" htmlFor="taskDescription">
                                Descrição
                            </label>
                            <input
                                className="h-9 w-full rounded px-2 text-base shadow-[0_0_0_1px]"
                                id="taskDescription"
                                name="description"
                                value={newTask.description}
                                placeholder="Insira uma descrição"
                                onChange={handleChange}
                            />
                        </fieldset>
                        <div className="flex justify-between">
                            <Dialog.Close asChild>
                                <button
                                    className="bg-red-500 text-white rounded font-medium"
                                    aria-label="Close"
                                >
                                    Cancelar
                                </button>
                            </Dialog.Close>
                            <Dialog.Close asChild>
                                <button onClick={handleNewTask} className="bg-green-600 text-white rounded font-medium">
                                    Salvar tarefa
                                </button>
                            </Dialog.Close>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

            <div>
                {renderTaskList}
            </div>
        </div>
    )
}

export default TaskApp