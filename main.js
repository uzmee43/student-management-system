#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
const sleep = () => { return new Promise(resolve => setTimeout(resolve, 2000)); };
async function wellcome() {
    let rainbowTiyle = chalkAnimation.rainbow("WELLCOME TO THE STUDENT MANAGEMENT SYSTEM");
    await sleep();
    rainbowTiyle.stop();
}
await wellcome();
const randomNumber = Math.floor(10000 + Math.random() * 1000);
let myBlance = 0;
let student = await inquirer.prompt([{
        type: "input",
        name: "studentName",
        message: "Enter your name",
        validate: function (value) {
            if (value.trim() !== " ") {
                return true;
            }
            return chalk.magenta("please enter your name");
        }
    },
    {
        name: "courses",
        type: "list",
        message: "Choose your course",
        choices: ["C#", "Java", "Python", "JavaScript"]
    }
]);
let tutionFee = {
    "C#": 1000,
    "Java": 2000,
    "Python": 3000,
    "JavaScript": 4000
};
console.log(`\nstudent ID : ${randomNumber} tutionfee:  ${tutionFee[student.courses]}/-\n`);
console.log(`student Blance ${myBlance}\n`);
let paymenttype = await inquirer.prompt([{
        type: "list",
        name: "payment",
        message: chalk.green("Choose your payment type"),
        choices: ["bank transfer", "Easypaisa", "Jazzcash"]
    }, {
        type: "input",
        name: "amount",
        message: "Enter your amount",
        validate: function (value) {
            if (value.trim() !== " ") {
                return true;
            }
            return chalk.magenta("please enter your amount");
        }
    }
]);
console.log(`\n you select payment method ${paymenttype.payment}/-\n`);
const tutionFees = tutionFee[student.courses];
const paymentamount = parseFloat(paymenttype.amount);
if (tutionFees === paymentamount) {
    console.log(chalk.green(`congratulations you have successfully enrolled in ${student.courses}.\n`));
    let ans = await inquirer.prompt([{
            type: "list",
            name: "list",
            message: "Choose your option",
            choices: ["view status", "Exit"]
        }]);
    if (ans.list === "view status") {
        console.log(chalk.redBright(`****YOUR STATUS****`));
        console.log(chalk.magenta(`student name:${student.studentName}`));
        console.log(chalk.bgCyan(`\nstudent ID : ${randomNumber}`));
        console.log(chalk.blue(`Course ${student.courses}`));
        console.log(chalk.green(`tutionfee:  ${tutionFee[student.courses]}/-\n`));
        console.log(chalk.red(`student Blance ${myBlance += paymentamount}\n`));
    }
    else if (ans.list === "Exit") {
        console.log(chalk.green(`Thank you for using our service`));
    }
}
else {
    console.log(chalk.red(`Invalid amount due to course`));
}
