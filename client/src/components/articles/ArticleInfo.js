import { Link } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { GET_ARTICLE, DELETE_ARTICLE, GET_ARTICLES } from '../../graphql/articleQueries';
import React from "react";
//import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

function ArticleInfo(props) {
  return (
    <Query query={GET_ARTICLE} variables={{ id: props.match.params._id }}>  
      {function({ loading, error, data }) {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        const { article } = data;
const data2 = [
      { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
      { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
      { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
      { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
      { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
      { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
      { name: '', uv: 3490, pv: 4300, amt: 2100 }
];
        return (
          <div>
            <h2>{article.title}</h2>
            <h3>Temperature: Outdoor and inside the hive</h3>
 <LineChart width={500} height={300} data={data2}>
    <XAxis  dataKey="name" label={{ value: "Time", position: "insideBottomRight", dy: 1}}  />
    <YAxis label={{ value: "Temp", position: "insideBottomRight", dy: 15}} />
    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    <Line type="monotone" dataKey="amt" stroke="#8ffa9d" />
  </LineChart>

            <h2>Relative humidity</h2>
 <LineChart width={500} height={300} data={data2}>
    <XAxis dataKey="name"/>
    <YAxis/>
    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
  </LineChart>
            <small>id: {article.id}</small>
            <h2>Hive scale</h2>
 <LineChart width={500} height={300} data={data2}>
    <XAxis dataKey="name"/>
    <YAxis/>
    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
    <Line type="monotone" dataKey="amt" stroke="#8ffa9d" />
  </LineChart>
            <p>{article.content}</p>
            <p className="btn-group">
              <Link to={`/articles/${article.id}/edit`} className="btn btn-info">Edit</Link> 
              <Mutation mutation={DELETE_ARTICLE} > 
                {function(deleteArticle, { data }) { 
                  return(
                    <button className="btn btn-danger"
                      onClick={() => { 
                        deleteArticle({ 
                          variables: { id: article.id }, 
                          refetchQueries: [{query: GET_ARTICLES}]
                          // Alternative to above, updates cache w/o new query:
                          // update(cache, { data: { createArticle } }) {
                          //   const { articles } = cache.readQuery({ query: GET_ARTICLES });
                          //   cache.writeQuery({
                          //     query: GET_ARTICLES,
                          //     data: { articles: articles.filter(a => (a.id !== article.id)) },
                          //   });
                          // }
                        });
                        props.history.push("/articles"); 
                      }}
                    >
                      Delete
                    </button> 
                  )
                }}
              </Mutation>
              <Link to="/articles" className="btn btn-secondary">Close</Link>
            </p>
            <hr/>
          </div>
        );
      }}
    </Query>
  )
}

export default ArticleInfo
