import { useSession } from "next-auth/client";
import Image from "next/image";
import { useRef, useState } from "react";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { db, storage } from "../firebase";
import firebase from "firebase";
const InputBox = () => {
  const [session] = useSession();
  const [imageToPost, setImageToPost] = useState(null);
  const inputRef = useRef(null);
  const filePickerRef = useRef(null);
  const submitForm = (e) => {
    e.preventDefault();
    if (!inputRef.current.value) return;
    db.collection("fc_posts")
      .add({
        message: inputRef.current.value,
        name: session.user?.name,
        email: session.user?.email,
        image: session.user?.image,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((doc) => {
        if (imageToPost) {
          const uploadTask = storage
            .ref(`fc_posts/${doc.id}`)
            .putString(imageToPost, "data_url");
          removeImage();
          uploadTask.on(
            "state_change",
            null,
            (error) => alert(error),
            () => {
              //when all done add it to the db doc
              // get the download url for reference in the post
              storage
                .ref("fc_posts")
                .child(doc.id)
                .getDownloadURL()
                .then((url) => {
                  db.collection("fc_posts").doc(doc.id).set(
                    {
                      postImage: url, // merging in the post above
                    },
                    { merge: true }
                  );
                });
            }
          );
        }
      });

    inputRef.current.value = "";
  };

  const addImageToPost = (e) => {
    e.preventDefault();
    if (!filePickerRef.current.value) return;
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
      console.log(imageToPost);
    };
  };
  const removeImage = () => {
    setImageToPost(null);
  };
  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
      <div className="flex space-x-4 p-4 items-center">
        <Image
          className="rounded-full"
          src={session.user.image}
          width={40}
          height={40}
          layout="fixed"
        />
        <form className="flex flex-1">
          <input
            type="text"
            placeholder={`What's on your mind ${session.user?.name}`}
            className="rounded-full h-12 bg-gray-50 flex-grow px-5 focus:outline-none"
            // onChange={(e) => setInput(e.target.value)}
            ref={inputRef}
          />
          <button onClick={submitForm} type="submit">
            post
          </button>
        </form>
        {imageToPost && (
          <div
            onClick={removeImage}
            className="flex cursor-pointer flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-110"
          >
            <img
              className="cursor-pointer h-10 w-10"
              src={imageToPost}
              alt="preview image click to remove"
            />
            <p className="cursor-pointer text-xs text-red-500 text-center">
              remove
            </p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-evenly p-3 border-t">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-400" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>
        <div
          onClick={() => filePickerRef.current.click()}
          className="inputIcon"
        >
          <CameraIcon className="h-7 text-green-500" />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
          <input
            ref={filePickerRef}
            type="file"
            onChange={addImageToPost}
            hidden
          />
        </div>
        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yellow-300" />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
};

export default InputBox;
