# Employee Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

Employee Tracker is a simple command-line application that allows users to interact with an employee database. Users can view, add, and delete the workplace's departments, roles, and employees. Employee's roles and managers can be updated. More advanced database queries even allow users to easily view employees by manager or by department, or calculate the total salaries for any given department, all from the Terminal.

This project was an exercise in creating an application that combines [PostgreSQL](https://www.postgresql.org/) with the [pg](https://www.npmjs.com/package/pg), [inquirer](https://www.npmjs.com/package/inquirer), and [TypeScript](https://www.npmjs.com/package/typescript) Node packages. 

## Installation

1. Download the project to your local environment by running the following commands in the terminal:

```
git clone https://github.com/mikelind28/employee-tracker.git
```

2. Rename the .env.EXAMPLE file to just .env, and add your PostgreSQL password.

3. Then, make sure to change directories into the Develop folder:

```
cd employee-tracker/Develop
```

4. Finally, install the required dependencies:

```
npm install
```
You're now ready to use Employee Tracker!

## Usage

After [installing](#installation) the application, simply run ```npm run build``` and then ```npm run start``` from the terminal from within the Develop folder. Then, follow the prompts using your keyboard's arrow keys and the return key. 

See a video walkthrough of the application [here]().

## License

This project uses an [MIT License ↗️](./LICENSE).

