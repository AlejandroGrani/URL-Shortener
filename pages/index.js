import { useState, useRef } from "react";
import { HoverEffect } from "@/components/ui/card-hover-effect"; 

export default function Home() {
  const inputRef = useRef();
  const [shortURL, setShortURL] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = inputRef.current.value.trim();

    if (url === "") {
      setError("Please enter a URL");
      return;
    }

    const isValidUrl = /^(http|https):\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/.test(url);
    if (!isValidUrl) {
      setError("Please enter a valid URL");
      return;
    }

    // TODO: Petición al API
    fetch('/api/shortUrl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    })
      .then((res) => res.json())
      .then((data) => {
        setShortURL(`Your shortened URL is: ${data.shortUrl}`);
        setError(null);
      })
      .catch((error) => {
        setError("Error ");
      });
  };

  const items = [
    { link: "/item1", title: "What are URL shorteners for?", description: "URL shorteners allow you to reduce the length of a link." },
    { link: "/item2", title: "Space saving", description: "On platforms with character limits, such as Twitter, shorteners allow you to share links without spending too many characters." },
    { link: "/item3", title: "Esthetics", description: " A short URL is cleaner and easier to remember or share in social networks, print or presentations." },
    
  ];

  const classes = `bg-transparent text-white border border-gray-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group`;
  
  return (
    <div className="relative h-screen fondo-oscuro">
      <main className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center">
        <h1 className="text-white text-4xl font-medium animate-bounce">
          Welcome to URL Shortener
        </h1>

        <div className="p-6 border border-gray-300 rounded-lg shadow-lg max-w-sm mx-auto mt-8 relative bg-transparent">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="bg-gray-900 p-4 rounded-md border border-transparent">
              <input
                ref={inputRef}
                type="text"
                className="p-2 border border-white-300 rounded-md bg-transparent text-white placeholder-white-600 w-full"
                placeholder="Enter URL"
              />
            </div>
            <div className="flex flex-col items-center gap-4">
              <button
                type="submit"
                className={`p-2 rounded-md ${classes} hover:scale-105 transition duration-300`}
              >
                <span className="text-xl hover:border-gradient">Shortener</span>
                <span
                  className="bg-gray-400 shadow-gray-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"
                ></span>
              </button>

              {error && (
                <span className="text-red-500 bg-gray-800 p-2 rounded-md border border-gray-300">
                  {error}
                </span>
              )}

              {shortURL && (
                <span className="text-white bg-gray-800 p-2 rounded-md border border-gray-300">
                  {shortURL}
                </span>
              )}
            </div>
          </form>
        </div>
        
        <div className="mt-12">
          <HoverEffect items={items} className="px-4" />
        </div>

      </main>

      <footer className="absolute bottom-0 left-0 right-0 p-4 text-center text-gray-400">
        Developed by Alejandro Granifo
      </footer>
    </div>

  );
}