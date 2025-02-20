function ProductImage({ images, selectedImage, setSelectedImage }) {
  return (
    <div className="flex flex-col space-y-4 w-full md:w-2/5">
      <img
        src={selectedImage}
        alt="Main Product"
        className="w-full md:h-100 object-cover rounded-lg"
      />
      <div className="flex space-x-2">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index}`}
            className={`w-20 h-20 md:w-16 md:h-16 object-cover rounded-lg cursor-pointer ${
              selectedImage === image ? "border-2 border-teal-500" : ""
            }`}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductImage;
