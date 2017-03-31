import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLUnionType
} from 'graphql';

const DogType = new GraphQLObjectType({
  name: 'Dog',
  fields: {
    dogName: { type: GraphQLString },
  },
});

const CatType = new GraphQLObjectType({
  name: 'Cat',
  fields: {
    catName: { type: GraphQLString },
  },
});

class Dog {
  constructor(name) {
    this.dogName = name;
  }
}

class Cat {
  constructor(name) {
    this.catName = name;
  }
}

const PetType = new GraphQLUnionType({
  name: 'Pet',
  types: [
    DogType,
    CatType
  ],
  resolveType: (value) => {
    if (value instanceof Dog) {
      return DogType;
    }
    if (value instanceof Cat) {
      return CatType;
    }

    throw new Error('Unmatched pet type');
  },
});

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    pet: { type: PetType },
  },
});

const peopleData = [
  { id: 1, name: 'John Smith', pet: new Dog('Rex') },
  { id: 2, name: 'Sara Smith', pet: new Cat('Garfield') },
  { id: 3, name: 'Budd Deey', pet: new Dog('Lassie')  },
];

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    people: {
      type: new GraphQLList(PersonType),
      resolve: () => peopleData,
    },
  },
});

export const doNothing = {
  type: GraphQLString,
  resolve: () => 'I did nothing',
};

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    doNothing,
  },
});

export const schema = new GraphQLSchema({ query: QueryType, mutation: MutationType });
