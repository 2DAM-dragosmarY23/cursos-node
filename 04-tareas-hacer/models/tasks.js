const Task = require('./task');

class Tasks {

    _list = {};

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

    loadTasksFromArray(tasks = []) {

        tasks.forEach(task => {
            
            this._list[task.id] = task;

        });


    }

    // taskDelete(opt) {
    //     const 
    // }


    taskCreate(desc = '') {
        const task = new Task(desc);

        this._list[task.id] = task;

    }

    completeList() {

        console.log();
        this.listArr.forEach((task, i) =>{
            const idx = `${i + 1}`.cyan;
            const {desc, completed} = task;
            //Tiene que quedar asi 1. tarea :: completada | pendiente
            const state = (completed) ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${idx} ${desc} :: ${state}`);
            

        })

    }

}


module.exports = Tasks;