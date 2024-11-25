import { useEffect } from "react";
import "../styles.css";
import { Button } from "react-bootstrap";
import { useState } from "react";

export default function Trackerpage() {

  const[page, setPage] = useState(1);
  useEffect(() => {
    const init = async () => {
			const data = await fetch(
				`https://www.themuse.com/api/public/jobs?page=${page}`,
			).then((res) => res.json());
			console.log(data);
    }
    init();
		}, [page]);
  return (
    <div>
      <h1>TRACKER PAGE</h1>
      <Button onClick={() => setPage(page + 1)}>Next Page</Button>
    </div>
  );
}
