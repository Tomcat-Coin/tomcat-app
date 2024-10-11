
function ImageWithFallback({ url, name }: { url: string, name: string }) {
  console.log(url);
  

  return (
    <div className="relative w-full h-full">
      <div className="w-full h-full flex justify-center items-center bg-gray-300 text-black rounded-lg">
        <p className="font-roboto font-black capitalize text-3xl">
          {name?.slice(0, 1)}
        </p>
      </div>
    </div>
  );
}

export default ImageWithFallback;