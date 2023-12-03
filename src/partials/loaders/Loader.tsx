import { lineSpinner } from "ldrs";

lineSpinner.register();

function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <l-line-spinner
        size="50"
        stroke="3"
        speed="1"
        color="black"
      ></l-line-spinner>
    </div>
  );
}

export default Loader;
