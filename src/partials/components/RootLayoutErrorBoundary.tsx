import { Button } from "@/components/ui/button";

function RootLayoutErrorBoundary() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <section className="flex flex-col items-center justify-center gap-5">
        <div className="flex w-full flex-col gap-2">
          <h1 className="text-5xl font-bold text-[#F24E1E]">Oops!</h1>
          <h2 className="text-lg font-semibold text-gray-600">
            {" "}
            We can't seem to load the page you're looking for.
          </h2>
          <h3 className="text-lg font-semibold text-gray-600">
            error code: <span className="font-bold text-[#F24E1E]">500</span>
          </h3>
        </div>
        <Button
          onClick={() => document.location.reload()}
          size={"lg"}
          className="gap-2 rounded-full bg-gray-950 text-base"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          Reload
        </Button>
      </section>
    </main>
  );
}

export default RootLayoutErrorBoundary;
