import React from 'react';
import { Helmet } from 'react-helmet'; 

const Results = (props) => {
  const {results} = props;
  return (
    <div>
      <Helmet><title>Résultat sondage</title></Helmet>
      <ul>
        {results && results.reverse().map((vote, index) => {
          return <li key={`result-${index}`}> { vote.title } : { vote.nbResponses }</li>
        })}
      </ul>
    </div>
  )
}

export default Results;
