const { useState, useEffect } = React;

function App(){

  const [quote,setQuote] = useState("");
  const [author,setAuthor] = useState("");
  const [loading,setLoading] = useState(false);
  const [likedQuotes,setLikedQuotes] = useState([]);

  const fetchQuote = async () => {

      setLoading(true);

      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();

      setQuote(data.content);
      setAuthor(data.author);

      setLoading(false);
  };

  useEffect(()=>{
      fetchQuote();
  },[]);


  const likeQuote = () => {

      const newQuote = quote + " - " + author;

      setLikedQuotes([...likedQuotes,newQuote]);
  };

  return(

    <div className="container">

      <h1>Daily Motivation Dashboard</h1>

      {loading ? (
        <p>Loading quote...</p>
      ) : (
        <div>
          <h3>"{quote}"</h3>
          <p>- {author}</p>
        </div>
      )}

      <button onClick={fetchQuote}>
        New Quote
      </button>

      <button onClick={likeQuote}>
        Like ❤️
      </button>

      <h3>Liked Quotes ({likedQuotes.length})</h3>

      <ul>
        {likedQuotes.map((q,index)=>(
            <li key={index}>{q}</li>
        ))}
      </ul>

    </div>

  );
}

ReactDOM.render(<App/>,document.getElementById("root"));
