import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';

class App extends Component {
  doNothing = () => {
    this.props.mutate().then((res) => console.log('doNothing result', res));
  }

  render() {
    const { data: { loading, people } } = this.props;
    return (
      <main>
        <header>
          <h1>Apollo Client Error Template</h1>
          <p>
            This is a template that you can use to demonstrate an error in Apollo Client.
            Edit the source code and watch your browser window reload with the changes.
          </p>
          <p>
            The code which renders this component lives in <code>./src/App.js</code>.
          </p>
          <p>
            The GraphQL schema is in <code>./src/graphql/schema</code>.
            Currently the schema just serves a list of people with names and ids.
          </p>
        </header>
        {loading ? (
          <p>Loading…</p>
        ) : (
          <ul>
            {people.map(person => (
              <li key={person.id}>
                {person.name}, {person.pet.dogName || person.pet.catName}
              </li>
            ))}
          </ul>
        )}
        <button onClick={this.doNothing}>Do nothing!</button>
      </main>
    );
  }
}

const withPeople = graphql(
  gql`{
    people {
      id
      name
      pet {
        ... on Dog {
          dogName
        }
        ... on Cat {
          catName
        }
      }
    }
  }`,
  {
    options: {
      reducer(prevResult) {
        console.log('people reducer');
        return prevResult;
      }
    },
  }
);

const withDoNothing = graphql(
  gql`
    mutation doNothing {
      doNothing
    }
  `
)

export default withDoNothing(withPeople(App))
