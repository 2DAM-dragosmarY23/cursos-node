const Task = require('./task');
const inquirer = require('inquirer').default;


class Tasks {

    _list = {
        'abc': 123
    };


    // Array de tareas
    get listArr() {

        const list = [];
        Object.keys(this._list).forEach(key => {
            const task = this._list[key];
            list.push(task);


        })

        return list;

    }

    constructor() {
        this._list = {};
    }

    //Función para borrar una tarea
    deleteTask(id = '') {
        if (this._list[id]) {
            delete this._list[id];
        }
    }

    //Función para cargar las tareas
    loadTasksFromArray(tasks = []) {

        tasks.forEach(task => {

            this._list[task.id] = task;

        });


    }

    //Función para crear una tarea
    taskCreate(desc = '') {
        const task = new Task(desc);

        this._list[task.id] = task;

    }

    //Función para mostrar las tareas 
    completeList() {

        console.log();
        this.listArr.forEach((task, i) => {
            const idx = `${i + 1}`.cyan;
            const { desc, completed } = task;
            const state = (completed) ? 'Completada'.green : 'Pendiente'.red;

            console.log(`${idx} ${desc} :: ${state}`);


        })

    }


    //Función para listar las tareas pendientes o completadas
    listPendingCompleted(completedIn = true) {

        console.log();
        let count = 0;
        this.listArr.forEach((task) => {

            const { desc, completed } = task;

            const state = (completed)
                ? 'Completada'.green
                : 'Pendiente'.red;

            if (completedIn) {
                //mostrar completadas
                if (completed) {
                    count += 1;
                    console.log(`${count.toString().cyan} ${'.'.cyan} ${desc} :: ${completed.cyan}`);
                }
            } else {
                if (!completed) {
                    count += 1;
                    console.log(`${count.toString().cyan} ${'.'.cyan} ${desc} :: ${state}`);
                }
            }

        });




    }

    //Función para marcar tareas completadas
    toggleCompleted(ids = []) {

        ids.forEach(id => {
            const task = this._list[id];
            if (!task.completed) {
                task.completed = new Date().toISOString();
            }
        });

        this.listArr.forEach(task => {

            if (!ids.includes(task.id)) {
                this._list[task.id].completed = null;
                
            }

        });

    }
}


module.exports = Tasks;