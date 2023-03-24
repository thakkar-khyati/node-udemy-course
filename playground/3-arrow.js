const task = {
  task: [
    {
      title: "grocery shopping",
      completed: true,
    },
    {
      title: "buying books",
      completed: false,
    },
    {
      title: "reading books",
      completed: false,
    },
  ],
  getTasksToDo() {
    return this.task.filter((t)=>{
      return t.completed ===  false;
    })
  },
};

console.log(task.getTasksToDo());
