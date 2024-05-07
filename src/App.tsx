import { useState, useEffect } from 'react'
import './App.css'

interface ImageData {
  url: string;
}

const useImageURL = () => {
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response1 = await fetch("https://jsonplaceholder.typicode.com/photos/1", { mode: "cors" });
        const response2 = await fetch("https://jsonplaceholder.typicode.com/photos/2", { mode: "cors" });

        if (!response1.ok || !response2.ok) {
          throw new Error("Error al cargar imagenes");
        }

        const [image1, image2] = await Promise.all<ImageData>([response1.json(), response2.json()]);

        setImageURL(image1.url);
        setTimeout(() => {
          setImageURL(image2.url); 
        }, 1000); 
      } catch (error: unknown) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return { imageURL, error, loading };
};

function App() {
  const { imageURL, error, loading } = useImageURL();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered!</p>;

  return (
    <div>
      {imageURL && (
        <div>
          <h1>An image</h1>
          <img src={imageURL} alt={"placeholder text"} />
        </div>
      )}
    </div>
  );
}

export default App;
