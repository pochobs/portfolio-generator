
// const profileDataArgs = process.argv.slice(2, process.argv.length);
// console.log(profileDataArgs)

// // console.log(profileDataArgs);// Notice the lack of parentheses around the `profileDataArr` parameter?

// const printProfileData = profileDataArr => {
//     for (let i = 0; i < profileDataArr.length; i += 1) {
//       console.log(profileDataArr[i]);
      
//     }
//     console.log('================');
//     profileDataArr.forEach(profileItem => console.log(profileItem));
      
    
// };
  
// printProfileData(profileDataArgs);
// const fs = require('fs');
// const generatePage = require('./src/page-template');

// const profileDataArgs = process.argv.slice(2);

// const [name, github] = profileDataArgs;

// fs.writeFile('index.html', generatePage(name, github), err => {
  // if (err) throw err;

  // console.log('Portfolio complete! Check out index.html to see the output!');
// });

const inquirer = require('inquirer');
inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?'
    }
  ])
  .then(answers => console.log(answers));