
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
const generatePage = require('./src/page-template');
const inquirer = require('inquirer');

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub Username (Required)',
      validate: gitHubInput  => {
        if (gitHubInput ) {
          return true;
        } else {
          console.log('Please enter your GitHub Username!');
          return false;
        }
      }
    },
    {
      // confirmation question
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an "About" section?',
      default: true
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:',
      //will only prompt the question if the function assigned to it returns true
      when: ({ confirmAbout }) => confirmAbout // conditional code based on the answers the user has supplied thus far
    },
  ]);
};

const promptProject = portfolioData => {
  // // projects array for portfolioData
  // portfolioData.projects = [];

  // If there's no 'projects' array property, create one

  //data collection system
  if (!portfolioData.projects) {
      portfolioData.projects = [];
  }

  console.log(`
  =================
  Add a New Project
  =================
  `);
  return inquirer.prompt([
  {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project? (Required)',
      validate: projectNameInput => {
        if (projectNameInput) {
          return true;
        } else {
          console.log('Please enter the name of your project!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (Required)',
      validate: descriptionInput => {
        if (descriptionInput) {
          return true;
        } else {
          console.log('Please enter a description of the project!');
          return false;
        }
      }
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you use with this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the GitHub link to your project.  (Required)',
      validate: linkInput => {
        if (linkInput) {
          return true;
        } else {
          console.log('Please enter the GitHub link to your project.');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }
  ])
  .then(projectData => {
    portfolioData.projects.push(projectData);
    if (projectData.confirmAddProject) {
      return promptProject(portfolioData);
    } else {
      return portfolioData;
    }
  });
};

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    const pageHTML = generatePage(portfolioData);

    // fs.writeFile('./index.html', pageHTML, err => {
    //   if (err) throw new Error(err);

    //   console.log('Page created! Check out index.html in this directory to see it!');
    // });
  });