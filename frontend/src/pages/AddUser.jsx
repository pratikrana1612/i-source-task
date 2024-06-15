import { Form, redirect, useActionData } from "react-router-dom";
import UserForm from "../components/UserForm";
import ErrorMessage from "../components/small/ErrorMesssage";
function getRandomDecimal() {
  return Math.random();
}
// This is a functional component that renders a form for adding a new user.
// It uses React Router DOM to handle routing and form submission.
export default function AddUser() {
  // Use the useActionData hook to get any error data from the server.
  let actionData = useActionData();

  // Render the form and display any error messages.
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

// This is an async function that handles form submission for the AddUser component.
// It sends a POST request to the server with the form data and redirects to the home page if successful.
export async function action({ request }) {
  // Get the form data from the request.
  const formData = await request.formData();

  // Check if the passwords match.
  if (formData.get("password") !== formData.get("re-password")) {
    // If they don't match, return an error object.
    return { errors: [{ msg: "Two Password are not same" }] };
  }

  // Send a POST request to the server with the form data.
  const response = await fetch("http://localhost:8081/api/users/user", {
    method: "POST",
    body: formData,
  });

  // If the request is not successful, get the error data from the server and return it.
  if (!response.ok) {
    const errorData = await response.json();
    return errorData;
  }

  // If the request is successful, redirect to the home page.
  return redirect("/");
}
