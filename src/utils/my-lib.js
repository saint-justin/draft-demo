// Hiya, 
// I know this isn't something that you all asked for, but I know that I can make what you asked for in the test
// just under slightly less stressful conditions and with a pinch more time. This is my attempt to re-create
// the coding test but in an isolated environment. Some details may not line up 100% with what you asked for
// and that's because I'm recreating the entire test from what I can remember about 7 hours (2 of which were
// spent on some much needed sleep) after the initial test. All code here is hand-written for this redo.
// 
// Thanks for your consideration,
// Justin Vaughn 

// Takes in a given test input and split it into a series of orders
class TestLib{

  constructor() {
    this.orgChart = {};
    
  }
  // Core organization chart object

  // Reads the set of input commands and executes them as needed
  // INPUT: str - String containing all commands to be executed
  readInput(str) {
    let commands = str.split('\n').map(str => str.split(','));
    let commandCount = Number(commands.shift());
    for (let i = 0; i < commandCount; i++){
      switch (commands[i][0]) {
        case 'add':
          this.add(commands[i][1], commands[i][2], commands[i][3]);
          break;
        case 'remove':
          this.remove(commands[i][1]);
          break;
        case 'print':
          this.print();
          break;
        case 'move':
          this.move(commands[i][1], commands[i][2])
      }
    }

    // Return out a printed version of the org chart
    console.log('Final org chart:');
    console.log(this.orgChart);

    // Clear the org chart for future tests
    this.orgChart = {};
  }
  
  // Adds a given employee to the org chart
  // INPUT: employeeId - The ID of the employee to be added
  // INPUT: managerId - The ID of the manager that this employee is assigned to, if top level employee this is -1
  // INPUT: name - The name of the employee to add
  // NOTE: I don't recall how you wanted me to handle collisions of employee ID's, so I'm just throwing an error and removing that employee from the chart
  add(employeeId, name, managerId) {
    // Check that an employee w/ this ID doesn't already exist, throw and error if that's the case
    if(!this.orgChart[employeeId])
      this.orgChart[employeeId] = { 'name': name, 'manager': managerId, 'employeeCount': 0 };
    else
      console.log(`Error with employee ID ${employeeId}, ${name} - Employee with that ID already exists`)

    // Cycle through all managers and add 1 to their employee count
    if (managerId != '-1') {
      let currentManager = managerId;
      this.orgChart[currentManager].employeeCount += 1;
      while (this.orgChart[currentManager].managerId) {
        currentManager = this.orgChart[currentManager].manager;
        this.orgChart[currentManager].employeeCount += 1;
      }
    }
  }
  
  // Removes a given employee from the org chart
  // INPUT: employeeId - The ID of the emmployee to remove
  remove(employeeId) {
    // Make sure an employee with this Id exists in the system
    if (!this.orgChart[employeeId])
      return;
    
    let removedEmployee = this.orgChart[employeeId];
    
    // Cycle through all managers and remove 1 from their employee count
    if (removedEmployee.manager != '-1') {
      let currentManager = employeeId;
      while (this.orgChart[currentManager].managerId) {
        this.orgChart[currentManager].employeeCount -= 1;
        currentManager = this.orgChart[currentManager].manager;
      }
    }
    
    // Finally, delete the employee from the org chart
    delete this.orgChart[employeeId];
  }
  
  // Moves an employee from their current manager to a new given manager
  // INPUT: employeeId - The ID of the employee to be moved
  // INPUT: managerId - The ID of the manager that this employee is assigned to
  move(employeeId, newManagerId) {
    let employee = this.orgChart[employeeId];
    this.remove(employeeId);
    this.add(employee.Id, employee.name, newManagerId);
  }

  // Gives a count of how many employees are managed by the given employeeId
  // INPUT: employeeId - The ID of the employee to be added
  // OUTPUT: returns the amount of employees managed a given employee
  count(employeeId) {
    return this.orgChart[employeeId].employeeCount;
  }
  
  // Prints out the org chart as prescribed in a single string, functionally a breadth-first search
  // OUTPUT: The org chart as a single string
  print() {
    let roster = this.addEmployeesToRoster('-1', 0);

    // Replace any misplaced linebreaks
    roster = roster.replace(/^\s+|\s+$/g, '');
    console.log(roster);
    return roster;
  }

  // Rosterizes a set of employees based on a manager's id and a given level of chain of command
  // INPUT: managerId - The ID of the manager to add
  // INPUT: level - Amount of levels from top of the organization this employee stands at (top level manager is 0)
  addEmployeesToRoster(managerId, level) {
    let roster = '';
    let currentLevelManagers = Object.keys(this.orgChart).filter((id) => this.orgChart[id].manager == managerId );
    for (let i = 0; i < currentLevelManagers.length; i++){
      roster += `${this.createPadding(level)}${this.orgChart[currentLevelManagers[i]].name} [${currentLevelManagers[i]}]\n`;
      if(this.orgChart[currentLevelManagers[i]].employeeCount > 0)
        roster += this.addEmployeesToRoster(currentLevelManagers[i], level + 1);
    }
    return roster;
  }

  // Helper function to create the left padding
  //INPUT: amount - How many pairings of spaces to return
  createPadding(amount) {
    let padding = '';
    for (let i = 0; i < amount; i++){
      padding += '  ';
    }
    return padding;
  }
}

export default TestLib;