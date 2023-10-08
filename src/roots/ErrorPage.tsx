// import { useRouteError } from "react-router-dom";

export default function ErrorPage(props: {position:string}) {
  // const error = useRouteError();

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        {props.position}
      </p>
    </div>
  );
}