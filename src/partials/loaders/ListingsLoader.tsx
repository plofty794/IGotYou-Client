import { zoomies } from "ldrs";
zoomies.register();

function ListingsLoader() {
  return (
    <>
      <div className="min-h-[50vh] flex items-center justify-center">
        <l-zoomies
          size="80"
          stroke="5"
          bg-opacity="0.1"
          speed="1.4"
          color="black"
        ></l-zoomies>
      </div>
    </>
  );
}

export default ListingsLoader;
