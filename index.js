require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');

const Country = require('./models/country');
const app = express();

app.use(bodyParser.json());

// CORS
app.use(cors())

app.get('/', (req, res) => {
    res.send('');
})

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`
        type Country {
          _id: ID!
          name: String!
          code: String!
          capital: String!
          flag: String!
          population: Int!
          area: Int!,
          region: String!
          domains: [String]!
        }
        input CountryInput {
            name: String!
            code: String!
            capital: String!
            flag: String!
            population: Int!
            area: Int!,
            region: String!
            domains: [String]!
        }
        type RootQuery {
            countries: [Country!]!
            country(code: String!): Country
        }
        type RootMutation {
            addCountry(data: CountryInput): Country
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        countries: () => {
            return Country.find().then(countries => {
                return countries.map(country => {
                    return {
                        ...country._doc,
                        _id: country.id
                    };
                });
            }).catch(err => {
                throw err;
            });
        },
        country: (args) => {
            return Country.find({code: args.code}).then(country => {
                return country[0];
            }).catch(err => {
                throw err;
            });
        },
        addCountry: (args) => {
            const country = new Country({
                name: args.data.name,
                code: args.data.code,
                capital: args.data.capital,
                flag: args.data.flag,
                population: args.data.population,
                area: args.data.area,
                region: args.data.region,
                domains: args.data.domains,
            });

            return country.save().then(result => {
                return {
                    ...result._doc,
                    _id: result._doc._id.toString()
                };
            }).catch(err => {
                console.log(err);
                throw err;
            });
        }
    },
    graphiql: true
}));

mongoose.connect(process.env.MONGODB_URL).then(async () => {
    const countriesSize = await mongoose.connection.db.collection('countries').countDocuments();

    // import
    if (!countriesSize) {
        try {
            const dataText = fs.readFileSync('./data/data.json', 'utf8')
            const data = JSON.parse(dataText);
            let index = 0;
            const addRow = (i) => {
                const country = new Country({
                    name: data[i].name,
                    code: data[i].alpha2Code.toLowerCase(),
                    capital: data[i].capital || data[i].name,
                    flag: data[i].flag,
                    population: parseInt(data[i].population) || 0,
                    area: parseInt(data[i].area) || 0,
                    region: data[i].region || 'None',
                    domains: data[i].topLevelDomain || [],
                });

                country.save().finally(() => {
                    index++;

                    if (index < data.length)
                        addRow(index);
                    else
                        console.log('Importing done. ' + index + ' countries imported.');
                });
            }

            console.log('Importing countries...');
            addRow(index);
        } catch (err) {
            console.error(err)
        }
    }

    app.listen(process.env.SERVER_PORT);
    console.log('Server is running...');
}).catch(err => {
    console.log(err);
});