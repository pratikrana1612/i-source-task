import Input from "./small/Input";
import { Link } from "react-router-dom";
export default function UserForm({ user }) {
  return (
    <>
      <Input
        type="text"
        name="name"
        label="Name*"
        placeholder="Enter Name"
        required={true}
        isRequired={true}
        defaultValue={user ? user.name : null}
      ></Input>
      <Input
        type="email"
        name="email"
        label="Email*"
        required={true}
        isRequired={true}
        placeholder="Enter Email"
        defaultValue={user ? user.email : null}
      ></Input>
      <Input
        type="text"
        name="username"
        label="Username*"
        required={true}
        isRequired={true}
        placeholder="Enter Username"
        defaultValue={user ? user.username : null}
      ></Input>
      <Input
        type="password"
        name="password"
        label="Password*"
        isRequired={user ? false : true}
        required={user ? false : true}
        placeholder="Enter Password"
      ></Input>
      <Input
        type="password"
        name="re-password"
        isRequired={user ? false : true}
        required={user ? false : true}
        label="Retype Password*"
        placeholder="Retype Password"
      ></Input>
      <Input
        type="tel"
        name="contact"
        label="Contact"
        placeholder="Enter Contact"
        maxLength={10}
        pattern="\d{10}"
        defaultValue={user ? user.contact : null}
      ></Input>
      <Input
        type="file"
        placeholder="Choose file"
        label="Image"
        name="image"
        accept="image/png, image/jpeg"
      ></Input>
      <button
        type="submit"
        className="!mt-8 px-6 py-2.5 text-sm bg-[#333] hover:bg-[#222] text-white rounded-sm"
      >
        {user ? "Update" : "Save"}
      </button>
      <button
        type="reset"
        className="m-5 px-5 py-2.5 text-sm tracking-wider font-medium border border-black outline-none bg-transparent hover:bg-black text-black hover:text-white transition-all duration-300"
      >
        Reset
      </button>
      <Link to="/">
        <button
          type="submit"
          className="!mt-8 px-6 py-2.5 text-sm bg-[rgba(51,51,51,0.8)] hover:bg-[#222] text-white rounded-sm"
        >
          Cancel
        </button>
      </Link>
    </>
  );
}
