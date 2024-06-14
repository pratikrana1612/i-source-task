import Input from "./small/Input";

export default function UserForm({ user }) {
  return (
    <>
      <Input
        type="text"
        name="name"
        label="Name*"
        placeholder="Enter Name"
        required={true}
        defaultValue={user ? user.name : null}
      ></Input>
      <Input
        type="email"
        name="email"
        label="Email*"
        required={true}
        placeholder="Enter Email"
        defaultValue={user ? user.email : null}
      ></Input>
      <Input
        type="text"
        name="username"
        label="Username*"
        required={true}
        placeholder="Enter Username"
        defaultValue={user ? user.username : null}
      ></Input>
      <Input
        type="password"
        name="password"
        label="Password*"
        required={user ? false : true}
        placeholder="Enter Password"
      ></Input>
      {/* <Input
        type="password"
        name="password"
        required={true}
        label="Retype Password*"
        placeholder="Retype Password"
      ></Input> */}
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
        Submit
      </button>
    </>
  );
}
