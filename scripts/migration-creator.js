const fs = require('fs');
const exec = require('await-exec')
const nameMigration = process.env.npm_config_name
const entitiesPathSuffix = "./src/entities/"


createMigration();

async function createMigration() {
    try {
        if (!nameMigration) throw new Error("No argument --name provided");
        await exec(`sequelize migration:generate --name "${nameMigration}"`);
        const fileName = getFileName(nameMigration);
        const entities = getEntities();
        let linesQuery = "";
        let lineImports = "";
        for (const entity of entities) {
            let entityContent = new entity.classContent();
            if(entityContent.modelName) {
                const instanceName = entityContent.getTableName();
                linesQuery += 
                `let ${instanceName} = new ${entityContent.constructor.name}()
                \n
                queryInterface.createTable("${instanceName}", ${instanceName}.getAttributes())\n`;
                lineImports += `const ${entityContent.constructor.name} = require('${entity.pathClass}')\n`
            }
        }
        fs.writeFileSync(fileName, writeMigration(linesQuery, lineImports))
    } catch (error) {
        console.error(error.message);
    }
}


function getFileName(name) {
    let fileName = undefined;
    const suffix = `./migrations`
    fs.readdirSync(suffix).forEach(file => {
        if (file.includes(`${name}.js`)) {
            fileName = `${suffix}/${file}`;
        }
    })
    return fileName;
}

function getEntities() {
    let entities = [];
    fs.readdirSync(entitiesPathSuffix).forEach(file => {
        console.log(`${entitiesPathSuffix}/${file.substring(0, file.length - 3)}`)
        let pathClass = `.${entitiesPathSuffix}/${file.substring(0, file.length - 3)}`;
        let classContent = require(pathClass);
        entities.push({
            pathClass : pathClass,
            classContent : classContent
        })
    })
    return entities;
}

function writeMigration(lineQueries, lineImports) {
    return `
    ${lineImports}
    'use strict';

    /** @type {import('sequelize-cli').Migration} */
    module.exports = {
      async up (queryInterface, Sequelize) {
        ${lineQueries}
      },
    
      async down (queryInterface, Sequelize) {
    
      }
    };
    `
}

