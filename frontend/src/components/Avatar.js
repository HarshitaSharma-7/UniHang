function Avatar({ name, image }) {

  if (image) {

    return (

      <img

        src={image}

        alt="profile"

        className="w-10 h-10 rounded-full object-cover"

      />

    );

  }


  const firstLetter = name ? name.charAt(0).toUpperCase() : "?";


  return (

    <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">

      {firstLetter}

    </div>

  );

}

export default Avatar;