import { Form, redirect, useActionData } from "react-router-dom";
import UserForm from "../components/UserForm";
import ErrorMessage from "../components/small/ErrorMesssage";
function getRandomDecimal() {
  return Math.random();
}
export default function AddUser() {
  let actionData = useActionData();
  return (
    <>
      <h1 className="text-3xl font-[sans-serif] text-center my-4">Add User</h1>
      {actionData && actionData.errors.length > 0 && (
        <ErrorMessage key={getRandomDecimal()}>
          {actionData.errors[0].msg}
        </ErrorMessage>
      )}
      <Form
        className="max-w-md mx-auto space-y-4 font-[sans-serif] text-[#333] mt-4"
        method="post"
        encType="multipart/form-data"
      >
        <UserForm></UserForm>
      </Form>
    </>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  if (formData.get("password") !== formData.get("re-password")) {
    return { errors: [{ msg: "Two Password are not same" }] };
  }

  //   let user = Object.fromEntries(formData);

  const response = await fetch("http://localhost:8081/api/users/user", {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    // body: JSON.stringify(student),
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    return errorData;
    // return redirect(redirectHelper("/students/add-student?error=true"));
  }

  return redirect("/");
}
